import { API_BASE_URL } from '@constants/';
import { tokenAuthHeaders } from '@utils/common';

export function getSports() {
  return fetch(`${API_BASE_URL}/sports`, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export function getSportEntries(type: string, sport: number | undefined) {
  const headers = tokenAuthHeaders();
  const sportFilter = sport ? `&sport=${sport}` : '';
  const today = new Date();
  const startTimestampOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  ).getTime();
  return fetch(
    `${API_BASE_URL}/sports-entries?_sort=publish_date:ASC&publish_date_gte=${startTimestampOfToday}&type=${type}${sportFilter}`,
    {
      method: 'get',
      headers
    }
  );
}

export function getYesterdaySportEntries(
  offset: number,
  sportFilter: number | undefined,
  limit = 3
) {
  const headers = tokenAuthHeaders();
  const today = new Date();
  const startTimestampOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  ).getTime();
  if (sportFilter) {
    return fetch(
      `${API_BASE_URL}/sports-entries?_limit=${limit}&_start=${offset}&_sort=publish_date:ASC&publish_date_gte=${
        startTimestampOfToday - 86400000
      }&publish_date_lte=${startTimestampOfToday}&sport=${sportFilter}`,
      {
        method: 'get',
        headers
      }
    );
  }
  return fetch(
    `${API_BASE_URL}/sports-entries?_limit=${limit}&_start=${offset}&_sort=publish_date:ASC&publish_date_gte=${
      startTimestampOfToday - 86400000
    }&publish_date_lte=${startTimestampOfToday}`,
    {
      method: 'get',
      headers
    }
  );
}

export default {
  getSports,
  getSportEntries,
  getYesterdaySportEntries
};
