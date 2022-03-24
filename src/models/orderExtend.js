import OrderDetail from './orderDetail'

class BaseOrderExtend extends OrderDetail {
  constructor(order, user) {
    super(order, user)
  }

  get totalDeposit() {
    return 0
  }
}

export default BaseOrderExtend
