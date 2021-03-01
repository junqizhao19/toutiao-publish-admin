import request from '@/utils/request'

// 上传图片素材
export const uploadImage = data => {
  return request({
    methods: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}

// 上传图片素材
export const getImages = params => {
  return request({
    methods: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}
// 收藏素材列表
export const collectImage = (imageId, collect) => {
  return request({
    methods: 'PUT',
    url: `/mp/v1_0/user/images/${imageId}`,
    data: {
      collect
    }
  })
}
