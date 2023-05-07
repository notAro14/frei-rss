import { State } from "src/store";

export function selectFeeds(state: State) {
  const { entities, result } = state.getFeeds;
  if (entities && result)
    return result.map((key) => {
      return entities.feeds[key];
    });

  return null;
}
