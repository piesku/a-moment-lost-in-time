import html from "innerself";
import Scene from "./Scene";
import { SCENES } from "./actions"
import { connect } from "./store";

function LevelScore(score, idx) {
  return html`
     <div class="box action"
       onclick="goto(${SCENES.FIND}, ${idx})"
       style="color: rgba(255, 255, 255, 0.35);">
       ${score}</div>
  `;
}

function LevelSelect({results}) {
  const total = results.reduce((acc, cur) => acc + cur, 0);
  const average = Math.floor(total / results.length);
  // An inverted hyperbola with lim(x → ∞) = 1.
  const threshold = 100 * (1 - 2.5 / results.length);

  return Scene(
    {id: SCENES.LEVELS, from: "#111", to: "#111"},
    html`
      <div class="ui" style="background: #111">
        <div class="pad">
          ${results.map(LevelScore)}
          ${ average > threshold
            ? `<div class="box action"
                onclick="goto(${SCENES.FIND}, ${results.length})">next</div>`
            : `<div class="box action"
                onclick="goto(${SCENES.NOPASS})"
                title="Collect more accurate moments before advancing.">…?</div>`
           }
        </div>
      </div>`
  );
}

export default connect(LevelSelect);
