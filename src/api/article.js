import request from '@/utils/request'

export const getArticles = params => {
  return request({
    methods: 'GET',
    url: ' /mp/v1_0/articles',
    // Body 参数使用data设置
    // Query 参数使用params设置
    // Headers 参数使用headers设置
    params
  })
}

export const getArticlesChannels = () => {
  return request({
    methods: 'GET',
    url: ' /mp/v1_0/channels'
  })
}
// 删除文章
export const deleteArticle = articleId => {
  return request({
    methods: 'DELETE',
    url: ` /mp/v1_0/articles/${articleId} `
  })
}
// 新建文章
export const addArticle = (data, draft = false) => {
  return request({
    methods: 'POST',
    url: ' /mp/v1_0/articles ',
    params: {
      draft // 是否存为草稿(true为草稿)
    },
    data
  })
}

// 新建文章
export const updateArticle = (articleId, data, draft = false) => {
  return request({
    methods: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft // 是否存为草稿(true为草稿)
    },
    data
  })
}

// 获取指定文章
export const getArticle = articleId => {
  return request({
    methods: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
