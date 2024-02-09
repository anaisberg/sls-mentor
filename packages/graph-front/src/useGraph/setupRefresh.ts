import { Dispatch, SetStateAction } from 'react';
import { GraphState, NODE_RADIUS } from './getInitialState';
import { rankingFunctions } from './ranking';
import { update } from './update';
import { OFFSET, updateWithRank } from './updateWithRank';
import { RankingKey } from '../types';

export const setupRefresh = ({
  currentContainer,
  ranking,
  setState,
}: {
  currentContainer: HTMLDivElement;
  ranking: RankingKey | undefined;
  setState: Dispatch<SetStateAction<GraphState>>;
}): {
  destroy: () => void;
} => {
  const { clientWidth, clientHeight } = currentContainer;

  const updateFn = ranking === undefined ? update : updateWithRank;

  if (ranking !== undefined) {
    const rankFn = rankingFunctions[ranking];
    if (rankFn === undefined) {
      throw new Error(`Ranking function for ${ranking} not found`);
    }

    setState(state => {
      const rankedNodes = Object.fromEntries(
        Object.values(state.nodes)
          .map(node => {
            const value = rankFn(node);
            return { arn: node.arn.toString(), value };
          })
          .filter(
            (node): node is { arn: string; value: number } =>
              node.value !== undefined,
          )
          .sort((a, b) => b.value - a.value)
          .map((node, index) => [node.arn, { rank: index, value: node.value }]),
      );

      return {
        ...state,
        nodes: Object.fromEntries(
          Object.entries(state.nodes).map(([arn, node]) => [
            arn,
            {
              ...node,
              rank: rankedNodes[arn]?.rank,
              value: rankedNodes[arn]?.value,
            },
          ]),
        ),
        nodeRadius:
          (clientHeight - OFFSET) /
          Math.ceil(Math.sqrt(Object.values(rankedNodes).length)) /
          3,
      };
    });
  } else {
    setState(state => ({
      ...state,
      nodeRadius: NODE_RADIUS,
    }));
  }

  const refresh = () => {
    setState(
      ({
        nodes,
        edges,
        mouseX,
        mouseY,
        nodeRadius,
        hoveredNode,
        hoveredNodeArn,
        zoomLevel,
        clickedNodeArn,
        clickedNode,
      }) => {
        updateFn({
          nodes,
          edges,
          clientWidth,
          clientHeight,
          clickedNodeArn,
          mouseX: mouseX - clientWidth / 2,
          mouseY: mouseY - clientHeight / 2,
          zoomLevel,
        });

        const connectedArns: Record<string, boolean> = {};
        edges.forEach(edge => {
          if (edge.from === hoveredNodeArn) {
            connectedArns[edge.to] = true;
          }
          if (edge.to === hoveredNodeArn) {
            connectedArns[edge.from] = true;
          }
        });

        return {
          nodes,
          edges,
          hoveredNode,
          hoveredNodeArn,
          connectedArns,
          mouseX,
          mouseY,
          nodeRadius,
          zoomLevel,
          clickedNodeArn,
          clickedNode,
        };
      },
    );
  };

  const onMouseMove = (event: MouseEvent) => {
    setState(state => ({
      ...state,
      mouseX: event.clientX,
      mouseY: event.clientY,
    }));
  };

  const interval = setInterval(refresh, 1000 / 30);
  currentContainer.addEventListener('mousemove', onMouseMove);

  return {
    destroy: () => {
      clearInterval(interval);
      currentContainer.removeEventListener('mousemove', onMouseMove);
    },
  };
};
