/**
 * 商品状态常量定义
 */
export const PRODUCT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published', // 已提交/待审核
  ONLINE: 'online',
  OFFLINE: 'offline',
  DELETED: 'deleted',
  REJECTED: 'rejected' // 新增：已驳回
}

/**
 * 状态对应的中文文案
 */
export const STATUS_TEXT_MAP = {
  [PRODUCT_STATUS.DRAFT]: '草稿',
  [PRODUCT_STATUS.PUBLISHED]: '已提交',
  [PRODUCT_STATUS.ONLINE]: '已上架',
  [PRODUCT_STATUS.OFFLINE]: '已下架',
  [PRODUCT_STATUS.REJECTED]: '已驳回' // 新增文案
}

/**
 * 状态对应的 CSS 类名后缀
 */
export const STATUS_CLASS_MAP = {
  [PRODUCT_STATUS.DRAFT]: 'draft',
  [PRODUCT_STATUS.PUBLISHED]: 'submitted',
  [PRODUCT_STATUS.ONLINE]: 'online',
  [PRODUCT_STATUS.OFFLINE]: 'offline',
  [PRODUCT_STATUS.REJECTED]: 'rejected' // 新增类名
}

/**
 * 获取状态文案
 */
export const getStatusText = (status) => {
  return STATUS_TEXT_MAP[status] || '未知状态'
}

/**
 * 获取状态类名
 */
export const getStatusClass = (status) => {
  if (status === PRODUCT_STATUS.PUBLISHED) return 'submitted';
  return STATUS_CLASS_MAP[status] || 'draft';
}