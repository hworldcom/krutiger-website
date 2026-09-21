import {
  createImageUrlBuilder,
  type SanityImageObject,
} from "@sanity/image-url";

export const SANITY_IMAGE_MAX_DIMENSION = 2_400;

export type SanityImageProject = Readonly<{
  projectId: string;
  dataset: string;
}>;

export type SanityImageDimensions = Readonly<{
  width: number;
  height: number;
  quality?: number;
}>;

export type SanityImageUrlFactory = (
  source: SanityImageObject,
  dimensions: SanityImageDimensions,
) => string;

function requireImageDimension(value: number, name: string) {
  if (
    !Number.isInteger(value) ||
    value < 1 ||
    value > SANITY_IMAGE_MAX_DIMENSION
  ) {
    throw new Error(
      `${name} must be a whole number between 1 and ${SANITY_IMAGE_MAX_DIMENSION}.`,
    );
  }

  return value;
}

export function createSanityImageUrlFactory(
  project: SanityImageProject,
): SanityImageUrlFactory {
  const builder = createImageUrlBuilder(project);

  return (source, { height, quality = 80, width }) => {
    const normalizedWidth = requireImageDimension(width, "Image width");
    const normalizedHeight = requireImageDimension(height, "Image height");

    if (!Number.isInteger(quality) || quality < 1 || quality > 100) {
      throw new Error(
        "Image quality must be a whole number between 1 and 100.",
      );
    }

    return builder
      .image(source)
      .width(normalizedWidth)
      .height(normalizedHeight)
      .fit("crop")
      .auto("format")
      .quality(quality)
      .url();
  };
}
