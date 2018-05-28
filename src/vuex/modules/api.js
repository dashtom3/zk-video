import {
  get
} from '../base';

// 获取轮播图
export function getCarousel(params) {
  return get('/adv/showAdv', params);
}
