import { memo, useMemo } from "react";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

function ArticleItem({ story }) {
  const formattedTime = useMemo(
    () => dateFormatter.format(new Date(story.time * 1000)),
    [story.time],
  );

  return (
    <article className="story">
      <div className="story-main">
        <h2>{story.title}</h2>
        <p>
          <span>by {story.by}</span>
          <span className="divider">•</span>
          <span>{story.score} points</span>
          <span className="divider">•</span>
          <span>{formattedTime}</span>
        </p>
      </div>
      <a
        className="story-link"
        href={story.url ?? `https://news.ycombinator.com/item?id=${story.id}`}
        target="_blank"
        rel="noreferrer"
      >
        Read story
      </a>
    </article>
  );
}

export default memo(ArticleItem);
