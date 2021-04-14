declare const BUILD_TIME_MILLIS: string;
declare const COMMITHASH: string;

const main = async () => {
  const response = await fetch("art-index.txt");
  const artIndex = (await response.text())
    .split("\n")
    .filter(isArtId)
    .sort(() => 0.5 - Math.random());
  const gallery = document.createElement("div");
  gallery.classList.add("gallery");
  artIndex.forEach((artId) => {
    const img = document.createElement("img");
    const anchor = document.createElement("a");
    anchor.href = artId;
    img.src = `${artId}/image-${artId}.png`;
    anchor.appendChild(img);
    gallery.appendChild(anchor);
  });
  document.body.appendChild(gallery);
};

type ArtId = string;

const ArtIdRegex = /^art-[a-z-0-9]+-[a-z0-9]+/i;

function isArtId(maybe: unknown): maybe is ArtId {
  return typeof maybe === "string" && ArtIdRegex.test(maybe);
}

(() => {
  console.log(
    `Hello fellow coder :)\nThis is ${COMMITHASH} build on ${new Date(
      BUILD_TIME_MILLIS
    ).toUTCString()}`
  );
  console.log(
    "You might be interested in this: https://www.redbubble.com/people/truepurpose/shop?artistUserName=truepurpose&asc=u&collections=2230474"
  );
  main();
})();
