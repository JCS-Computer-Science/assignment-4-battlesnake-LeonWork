import { move as advancedMove } from "./LeonAdvanced.js";

export function move(gameState, self) {
  gameState.you = self;
  return advancedMove(gameState, self);
}
