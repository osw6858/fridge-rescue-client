export const BASE_URL = 'http://fridge-rescue.ap-northeast-2.elasticbeanstalk.com/' as const;

export const MOCK_SERVER_URL = 'http://localhost:3001' as const;

export const ROOT_URL = 'http://localhost:5173/';

export const ACCESS_TOKEN_KEY = 'refrigeKey' as const; // TODO: 임시 로컬스토리지 key 임으로 추후 합의 후 변경 필요

export const END_POINTS = {
  MEMBERS: 'members',
  RECIPES: 'recipes',
  TOKEN: 'token/refresh',
  INGREDIENT: 'ingredient',
} as const;

export const HTTP_STATUS_CODE = {} as const;

export const ERROR_CODE = {} as const;

export const HTTP_ERROR_MESSAGE = {} as const;
