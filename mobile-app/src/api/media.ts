export interface MediaDetail {
  file: string;
  width: number;
  height: number;
  filesize: number;
  mime_type: string;
  source_url: string;
}

export interface Media {
  id: number;
  title: {
    rendered: string;
  }
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: {
      thumbnail?: MediaDetail;
      medium?: MediaDetail;
      medium_large?: MediaDetail;
      large?: MediaDetail;
      full?: MediaDetail;
    }
  }
}

export type GetMediaResponse = Media | null;

export async function getMedia(mediaId: number): Promise<GetMediaResponse> {
  const response = await fetch(`https://mensa.id/wp-json/wp/v2/media/${mediaId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return await response.json();
}
