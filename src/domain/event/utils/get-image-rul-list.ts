import { getImageUrl } from "@/domain/event/api/get-image-url";
export const getImageUrlList = async (
  eventId: string,
  imageIdList: string[],
) => {
  try {
    const imageUrlList = await Promise.all(
      imageIdList.map(async (imageId) => {
        const url = await getImageUrl(eventId, imageId);
        if (!url) {
          throw new Error("can not get image url");
        }
        return { imageId, url };
      }),
    );

    return imageUrlList;
  } catch (error) {
    if (error instanceof Error) {
      throw new TypeError(error.message);
    }
  }
};
