<template>
  <div class="animate__animated animate__fadeIn animate__fast">
    <!-- 訂單列表 -->
    <h2
      v-if="reviewResult.orders && reviewResult.orders.length > 0"
      class="mb-3 mt-5 px-4 text-xl font-bold"
    >
      訂單列表
    </h2>
    <div class="rounded-[10px] bg-white px-[1rem] py-[2rem] font-sans font-normal">
      <p v-if="reviewResult.orders && reviewResult.orders.length === 0" class="text-center text-ml">
        此客戶尚無服務紀錄
      </p>
      <ul v-if="reviewResult.orders && reviewResult.orders.length > 0" class="grid gap-4">
        <li v-for="item in reviewResult.orders" :key="item.id" class="w-full">
          <p class="mb-2 text-xl font-bold">{{ item.date }} 訂單編號 {{ item.no }}</p>
          <div class="grid grid-cols-12 gap-2">
            <div class="col-span-12 flex justify-between border-b border-dashed border-gray pb-2">
              <p>服務消費</p>
              <p>${{ item.serviceFakeTotal }}</p>
            </div>
            <div class="col-span-12 flex justify-between border-b border-dashed border-gray pb-2">
              <p>店販消費</p>
              <p>${{ item.productFakeTotal }}</p>
            </div>
            <div class="col-span-12 flex justify-between border-b border-dashed border-gray pb-2">
              <p>卡券使用(入業績)</p>
              <p>${{ item.useTicketTotal }}</p>
            </div>
            <div class="col-span-12 flex justify-between border-b border-dashed border-gray pb-2">
              <p>卡券販賣(入業績)</p>
              <p>${{ item.ticketSellIntoPerformance }}</p>
            </div>
            <div class="col-span-12 flex justify-between border-b border-dashed border-gray pb-2">
              <p>業績收入</p>
              <p>${{ item.performanceIncome }}</p>
            </div>
            <div class="col-span-12 flex justify-between border-b border-dashed border-gray pb-2">
              <p>卡券販賣(不入業績)</p>
              <p>${{ item.ticketSellNotIntoPerformance }}</p>
            </div>
            <div class="col-span-12 flex justify-between border-b border-dashed border-gray pb-2">
              <p>卡券使用(-)</p>
              <p>${{ item.usedTicketForDecount }}</p>
            </div>
            <div class="col-span-12 flex justify-between border-b border-dashed border-gray pb-2">
              <p>第三方卡券(-)</p>
              <p>${{ item.thirdPartTicketForDecount }}</p>
            </div>
            <div class="col-span-12 flex justify-between border-b border-dashed border-gray pb-2">
              <p>其他付款方式(-)</p>
              <p>${{ item.otherPayWayForDecount }}</p>
            </div>
            <div class="col-span-12 flex justify-between border-b border-dashed border-gray pb-2">
              <p>入金使用(-)</p>
              <p>${{ item.walletUsedForDecount }}</p>
            </div>
            <div class="col-span-12 flex justify-between">
              <p>營業現金應收</p>
              <p>${{ item.businessCash }}</p>
            </div>
          </div>
          <ul class="my-2">
            <li
              @click="item.isOpen = !item.isOpen"
              @keypress="item.isOpen = !item.isOpen"
              class="mb-2 flex items-center justify-between rounded-[10px] bg-[#efefef] px-2 py-3"
            >
              <p class="text-lg">詳細資料</p>
              <font-awesome-icon
                icon="fa-regular fa-angle-up"
                class="cursor-pointer text-lg duration-200"
                :class="{ 'rotate-180': item.isOpen }"
              />
            </li>
            <ul
              class="overflow-hidden rounded-[10px] bg-[#efefef] duration-200"
              :class="{ 'max-h-[300vh] px-2 py-3': item.isOpen, 'max-h-[0px]': !item.isOpen }"
            >
              <li>
                <table class="w-full">
                  <thead>
                    <tr>
                      <th>設計師</th>
                      <th>項目</th>
                      <th>價格</th>
                      <th>互助人</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(staticItem, idx) in item.staticDetail"
                      :key="idx"
                      :class="{
                        'border-b border-dashed border-gray py-1.5 pb-2':
                          idx !== item.staticDetail.length - 1,
                      }"
                    >
                      <td>{{ staticItem.designerName }}</td>
                      <td>{{ staticItem.itemName }}</td>
                      <td>${{ staticItem.price }}</td>
                      <td>
                        <p v-for="(helperItem, idx2) in staticItem.helperList" :key="idx2">
                          {{ helperItem.helperName }}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ul>
          </ul>
        </li>
      </ul>
    </div>
    <!-- <div class="border-b border-solid border-primary/50 px-2 pb-4" v-for="(item,index) in resultList" :key="`consumption${index}`">
      <div>
        <div class="mt-2 flex text-left">
          <div  class="w-2/5">帳號編號</div>
          <div class="w-3/5">{{item.no}}</div>
        </div>
        <div class="mt-2 flex text-left">
          <div  class="w-2/5">帳單時間</div>
          <div class="w-3/5">{{$dayjs(item.date).format('YYYY/MM/DD')}}</div>
        </div>
        <div class="mt-2 flex text-left">
          <div  class="w-2/5">設計師</div>
          <div v-if="item.designer" class="w-3/5">{{item.designer.name}}</div>
          <div v-else class="w-3/5">不指定</div>
        </div>
        <div class="mt-2 flex text-left">
          <div  class="w-2/5">指定</div>
          <div class="w-3/5">{{item.isDesignate ? '是' : '否'}}</div>
        </div>
        <div class="mt-2 flex text-left">
          <div  class="w-2/5">訂單狀態</div>
          <div class="w-3/5">{{item.status}}</div>
        </div>
        <div v-if="item.remarkForCustomer" class="mt-2 flex text-left">
          <div  class="w-2/5">備註</div>
          <div class="w-3/5">{{item.remarkForCustomer}}</div>
        </div>
        <div class="mt-2 flex text-left">
          <div  class="w-2/5">服務消費</div>
          <div class="w-3/5">${{item.serviceFakeTotal}}</div>
        </div>
        <div class="mt-2 flex text-left">
          <div  class="w-2/5">店販消費</div>
          <div class="w-3/5">${{item.productFakeTotal}}</div>
        </div>
        <div class="mt-2 flex text-left">
          <div  class="w-2/5">預收卡販賣</div>
          <div class="w-3/5">${{item.ticketSellIntoPerformance + item.ticketSellNotIntoPerformance}}</div>
        </div>
        <div class="mt-2 flex text-left">
          <div  class="w-2/5">預收卡使用</div>
          <div class="w-3/5">${{item.useTicketTotal}}</div>
        </div>
        <div class="mt-2 flex text-left">
          <div  class="w-2/5">會員卡販賣</div>
          <div class="w-3/5">${{item.membershipFakeTotal}}</div>
        </div>
        <div class="mt-2 flex text-left">
          <div  class="w-2/5">實際支付現金</div>
          <div class="w-3/5">${{item.membershipFakeTotal}}</div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'customer-component-consumption',
  mounted() {
    this.getOrders();
  },
  deactivated() {
    window.removeEventListener('scroll', this.scrollGetOrders);
  },
  activated() {
    if (!this.isEnd) window.addEventListener('scroll', this.scrollGetOrders);
  },
  data() {
    return {
      resultList: [],
      reviewResult: {},
      submitForm: {
        pageLimit: 10,
        pageOffset: 0,
      },
      totalPage: 0,
      isEnd: false,
      isGetting: false,
    };
  },
  methods: {
    // 取得服務紀錄
    async getOrders() {
      const submitForm = {
        customerId: this.$route.query.id ? this.$route.query.id : '',
        pageLimit: this.submitForm.pageLimit,
        pageOffset: this.submitForm.pageOffset,
        isReserved: false,
      };

      const res = await this.$api.designerOrders(submitForm);
      const { data } = res.data;

      if (data.orders.orders.length > 0) {
        /* eslint-disable */
        data.orders.orders.forEach((item, idx) => {
          item["isOpen"] = false;
          if (idx === data.orders.orders.length - 1) {
            let newOrders = data.orders.orders.map((item) => {
              const timeStamp = item.date;
              const date = new Date(timeStamp);
              const dateFormate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
              item.date = dateFormate;
              return item;
            });
            data.orders.orders = newOrders;

            this.reviewResult = data.orders;
          }
        });
        /* eslint-disable */
      } else this.reviewResult = data.orders;

      this.totalPage = Math.ceil(data.orders.totalCount / 10) - 1;
      this.isEnd = Math.ceil(data.orders.totalCount / 10) === 1;
      // this.resultList = data.orders.orders;

      if (this.submitForm.pageOffset < this.totalPage)
        window.addEventListener("scroll", this.scrollGetOrders);
    },
    // 滾動加載服務紀錄
    async scrollGetOrders() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

      if (!this.isEnd && !this.isGetting && scrollTop + windowHeight >= scrollHeight - 50) {
        this.isGetting = true;
        this.submitForm.pageOffset += 1;

        if (this.submitForm.pageOffset >= this.totalPage) {
          this.isEnd = true;
          window.removeEventListener("scroll", this.scrollGetOrders);
        }

        const submitForm = {
          customerId: this.$route.query.id ? this.$route.query.id : "",
          pageLimit: 10,
          pageOffset: this.submitForm.pageOffset,
        };

        const res = await this.$api.designerOrders(submitForm);
        const { data } = res.data;

        this.isGetting = false;

        if (data.orders.orders.length > 0) {
          /* eslint-disable */
          data.orders.orders.forEach((item, idx) => {
            item["isOpen"] = false;
            if (idx === data.orders.orders.length - 1) {
              let newOrders = data.orders.orders.map((item) => {
                const timeStamp = item.date;
                const date = new Date(timeStamp);
                const dateFormate = `${date.getFullYear()}/${
                  date.getMonth() + 1
                }/${date.getDate()}`;
                item.date = dateFormate;
                return item;
              });
              this.reviewResult.orders = this.reviewResult.orders.concat(newOrders);
            }
          });
          /* eslint-disable */
        }
      }
    },
  },
};
</script>

<style></style>
