<template>
  <C-Main-Block>
    <C-Back-Nav></C-Back-Nav>

    <section class="relative p-4">
      <div class="mb-4 flex">
        <h1 class="m-auto text-[17px] font-bold">店販分類抽成明細表</h1>
      </div>
      <div class="my-4 flex items-center justify-between px-4">
        <p><strong>設計師：</strong> {{ designerName + " | " + GETTER_MECHANTNAME }}</p>
      </div>
      <div
        class="mb-2 flex flex-wrap items-center gap-2 rounded-[10px] bg-white p-4 font-sans text-sm font-normal"
      >
        <h2 class="w-full text-sm">日期選擇</h2>
        <div class="flex gap-2 text-sm">
          <button class="btn-class" @click="setMonth(0)">本月</button>
          <button class="btn-class" @click="setMonth(1)">上個月</button>
          <button class="btn-class" @click="setDay(2)">前天</button>
          <button class="btn-class" @click="setDay(1)">昨天</button>
          <button class="btn-class" @click="setDay(0)">今天</button>
        </div>
        <div class="flex gap-2 text-sm">
          <vc-date-picker v-model="startDate" mode="date" :max-date="$dayjs().format('YYYY-MM-DD')">
            <template v-slot="{ inputValue, inputEvents }">
              <input
                class="btn-class w-[114px]"
                placeholder="起始日"
                :value="inputValue"
                v-on="inputEvents"
              />
            </template>
          </vc-date-picker>
          <vc-date-picker v-model="endDate" mode="date" :max-date="$dayjs().format('YYYY-MM-DD')">
            <template v-slot="{ inputValue, inputEvents }">
              <input
                class="btn-class w-[114px]"
                :value="inputValue"
                placeholder="結束日"
                v-on="inputEvents"
              />
            </template>
          </vc-date-picker>
        </div>
        <div class="flex w-full">
          <div class="flex w-1/2 flex-wrap gap-2">
            <h2 class="w-full">分類依據</h2>

            <button class="btn-class" @click="setData('', 'DATE')">日期</button>
            <button class="btn-class" @click="setData('', 'PRODUCTNO')">商品</button>
          </div>

          <div class="flex w-1/2 flex-wrap gap-2">
            <h2 class="w-full">時間排序</h2>

            <button class="btn-class" @click="setData('DESC')">由大至小</button>
            <button class="btn-class" @click="setData('ASC')">由小至大</button>
          </div>
        </div>
        <div class="flex w-full">
          <div class="flex w-1/2 flex-wrap gap-2">
            <h2 class="w-full">客戶篩選</h2>
            <C-Select
              class="w-[150px] rounded-[5px] border border-ml bg-[#fff]"
              :list="customerList"
              v-model="customerSelected"
              item-text="name"
              item-value="id"
            ></C-Select>
          </div>
          <div class="flex w-1/2 flex-wrap gap-2">
            <h2 class="w-full">商品篩選</h2>
            <C-Select
              class="w-[150px] rounded-[5px] border border-ml bg-[#fff]"
              :list="productList"
              v-model="productSelected"
              item-text="name"
              item-value="id"
            ></C-Select>
          </div>
        </div>
      </div>
      <div
        class="flex w-full flex-wrap items-center gap-2 rounded-[10px] bg-white p-4 font-sans text-sm font-normal"
      >
        <div class="w-full overflow-x-auto text-sm">
          <div class="w-[768px] break-words md:w-full">
            <div class="sheet rounded-[5px] bg-ml text-white">
              <div class="w-[12%]">日期</div>
              <div class="w-1/12">訂單編號</div>
              <div class="w-1/12">客戶</div>
              <div class="w-1/6">商品名稱代號</div>
              <div class="w-1/12 text-right">實際售價</div>
              <div class="w-1/12 text-right">數量</div>
              <div class="w-1/12 text-right">小計</div>
              <div class="w-1/12 text-right">手續費</div>
              <div class="w-[12%] text-right">販售業績(實)</div>
              <div class="w-1/12 text-right">抽成</div>
            </div>
            <p v-if="!showList.length" class="py-4 text-center text-xl font-bold">尚無資料</p>

            <div v-else v-for="(prod, index) in showList" :key="index">
              <div class="sheet">
                <div class="w-[12%]">{{ prod.orderDate | dateFmtROCMMDD }}</div>
                <div class="w-1/12">#{{ prod.orderNo }}</div>
                <div class="w-1/12">{{ prod.customerName }}</div>
                <div class="w-1/6">{{ prod.productName }} / {{ prod.productNo }}</div>

                <div class="w-1/12 text-right">{{ prod.price }}</div>
                <div class="w-1/12 text-right">{{ prod.count }}</div>
                <div class="w-1/12 text-right">{{ prod.subtotal }}</div>
                <div class="w-1/12 text-right">{{ prod.handlingFee }}</div>
                <div class="w-[12%] text-right">{{ prod.sell }}</div>
                <div class="w-1/12 text-right">{{ prod.commission }}</div>
              </div>
              <!-- 以日期篩選的小計 -->
              <template v-if="prod.showSubtotalDate">
                <div class="sheet count mt-4 rounded-[5px] bg-[#efefef]">
                  <div class="w-[12%]"></div>
                  <div class="w-1/12"></div>
                  <div class="w-1/12"></div>
                  <div class="w-1/6">小計</div>
                  <div class="w-1/12 text-right"></div>
                  <div class="w-1/12 text-right">
                    {{ filter("date", prod.orderDate)?.count }}
                  </div>
                  <div class="w-1/12 text-right">
                    {{ filter("date", prod.orderDate)?.subtotal }}
                  </div>
                  <div class="w-1/12 text-right">
                    {{ filter("date", prod.orderDate)?.handlingFee }}
                  </div>
                  <div class="w-[12%] text-right">
                    {{ filter("date", prod.orderDate)?.sell }}
                  </div>
                  <div class="w-1/12 text-right">
                    {{ filter("date", prod.orderDate)?.commission }}
                  </div>
                </div>
              </template>
              <!-- 以產品篩選的小計 -->
              <template v-if="prod.showSubtotalProduct">
                <div class="sheet count mt-4 rounded-[5px] bg-[#efefef]">
                  <div class="w-[12%]"></div>
                  <div class="w-1/12"></div>
                  <div class="w-1/12"></div>
                  <div class="w-1/6">小計</div>
                  <div class="w-1/12 text-right"></div>
                  <div class="w-1/12 text-right">
                    {{ filter("prodnumber", prod.productNo)?.count }}
                  </div>
                  <div class="w-1/12 text-right">
                    {{ filter("prodnumber", prod.productNo)?.subtotal }}
                  </div>
                  <div class="w-1/12 text-right">
                    {{ filter("prodnumber", prod.productNo)?.handlingFee }}
                  </div>
                  <div class="w-[12%] text-right">
                    {{ filter("prodnumber", prod.productNo)?.sell }}
                  </div>
                  <div class="w-1/12 text-right">
                    {{ filter("prodnumber", prod.productNo)?.commission }}
                  </div>
                </div>
              </template>
            </div>
            <div class="sheet count" v-if="showList.length">
              <div class="w-[12%]">合計</div>
              <div class="w-1/12"></div>
              <div class="w-1/12"></div>
              <div class="w-1/6"></div>
              <div class="w-1/12 text-right"></div>
              <div class="w-1/12 text-right">{{ countTotal }}</div>
              <div class="w-1/12 text-right">{{ subtotalTotal }}</div>
              <div class="w-1/12 text-right">{{ handlingFeeTotal }}</div>
              <div class="w-[12%] text-right">{{ sellTotal }}</div>
              <div class="w-1/12 text-right">{{ commissionTotal }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'draw-Detail',
  description: '店販抽成報表',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 店販抽成明細',
  },
  data() {
    return {
      designerName: '',
      startDate: this.$dayjs().valueOf(),
      endDate: this.$dayjs().valueOf(),
      sortWay: 'ASC',
      productOrderWay: 'DATE',
      productOrdersList: [],
      showList: [],
      customerSelected: '',
      productSelected: '',
      smallCountDate: [],
      smallCountProduct: [],
      countTotal: 0,
      subtotalTotal: 0,
      handlingFeeTotal: 0,
      sellTotal: 0,
      commissionTotal: 0,
      customerList: [
        {
          id: '',
          name: '請選擇',
        },
      ],

      productList: [
        {
          id: '',
          name: '請選擇',
        },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.productOrdersWithoutPaging();
      this.getProductAndCustomer();
      this.designerName = this.userInfo.user.name;
    },
    setMonth(count) {
      this.startDate = this.$dayjs().subtract(count, 'month').startOf('month').valueOf();
      this.endDate = this.$dayjs().subtract(count, 'month').endOf('month').valueOf();
    },
    setDay(count) {
      this.startDate = this.$dayjs().subtract(count, 'day').valueOf();
      this.endDate = this.$dayjs().subtract(count, 'day').valueOf();
    },

    async productOrdersWithoutPaging(
      customerId = this.customerSelected,
      productId = this.productSelected,
      sortWay = this.sortWay,
      productOrderWay = this.productOrderWay,
    ) {
      const submit = {
        input: {
          customerIds: customerId ? [customerId] : [],
          startDate: this.$dayjs(this.startDate).valueOf(),
          endDate: this.$dayjs(this.endDate).valueOf(),
          sellerId: this.userInfo.user.id,
          productId,
          productOrderWay,
          sortWay,
        },
      };

      const resp = await this.$api.productOrdersWithoutPaging(submit);
      const { data, errors } = JSON.parse(JSON.stringify(resp.data));
      if (errors) return;
      this.productOrdersList = data?.productOrdersWithoutPaging;
      console.log(this.productOrdersList);
      // 處理項目資料
      this.productOrdersList = this.productOrdersList.map((item, idx, array) => {
        const commom = {
          subtotal: Math.round(item.count) * Math.round(item.price),
          sell: Math.round(item.count) * Math.round(item.price) - Math.round(item.handlingFee),
          handlingFee: Math.round(item.handlingFee),
          price: Math.round(item.price),
          count: Math.round(item.count),
          commission: Math.round(item.commission),
        };

        if (
          productOrderWay === 'DATE'
          && (idx !== array.length - 1
            ? this.dtfm(array[idx].orderDate) !== this.dtfm(array[idx + 1].orderDate)
            : true)
        ) {
          return {
            showSubtotalDate: true,
            ...item,
            ...commom,
          };
        }
        if (
          productOrderWay === 'PRODUCTNO'
          && (idx !== array.length - 1 ? array[idx].productNo !== array[idx + 1].productNo : true)
        ) {
          return {
            showSubtotalProduct: true,
            ...item,
            ...commom,
          };
        }
        return {
          showSubtotalDate: false,
          showSubtotalProduct: false,
          ...item,
          ...commom,
        };
      });
      const dateArrKey = [];
      const productArrKey = [];
      // 抓dateKey 跟ProductArrkey

      const productLST = this.productOrdersList.filter(
        (item, index, arr) => arr.findIndex((s) => item.productId === s.productId) === index,
      );

      const dateList = this.productOrdersList.filter(
        (item, index, arr) => arr.findIndex((s) => this.dtfm(item.orderDate) === this.dtfm(s.orderDate)) === index,
      );

      productLST.forEach((i) => {
        productArrKey.push(i.productNo);
      });

      dateList.forEach((i) => {
        dateArrKey.push(this.dtfm(i.orderDate));
      });

      this.smallCountDate = [];
      dateArrKey.forEach((i) => {
        const cnt = {
          date: i,
          count: 0,
          subtotal: 0,
          handlingFee: 0,
          sell: 0,
          commission: 0,
        };
        this.productOrdersList.forEach((j) => {
          if (this.dtfm(j.orderDate) === i) {
            cnt.count += j.count;
            cnt.subtotal += j.subtotal;
            cnt.handlingFee += j.handlingFee;
            cnt.sell += j.sell;
            cnt.commission += j.commission;
          }
        });

        this.smallCountDate.push(cnt);
      });
      this.smallCountProduct = [];
      productArrKey.forEach((i) => {
        const cnt = {
          prodnumber: i,
          count: 0,
          subtotal: 0,
          handlingFee: 0,
          sell: 0,
          commission: 0,
        };
        this.productOrdersList.forEach((j) => {
          if (j.productNo === i) {
            cnt.count += j.count;
            cnt.subtotal += j.subtotal;
            cnt.handlingFee += j.handlingFee;
            cnt.sell += j.sell;
            cnt.commission += j.commission;
          }
        });

        this.smallCountProduct.push(cnt);
      });

      this.showList = this.productOrdersList;
      this.caculateTotal();
    },
    dtfm(date) {
      return this.$dayjs(date).format('YYYY/MM/DD');
    },
    getProductAndCustomer() {
      this.customerList = [
        {
          id: '',
          name: '請選擇',
        },
      ];
      this.productList = [
        {
          id: '',
          name: '請選擇',
        },
      ];
      const customerLST = this.productOrdersList.filter(
        (item, index, arr) => arr.findIndex((s) => item.customerName === s.customerName) === index,
      );
      customerLST.forEach((i) => {
        this.customerList.push({
          id: i.customerId,
          name: i.customerName,
        });
      });
      const productLST = this.productOrdersList.filter(
        (item, index, arr) => arr.findIndex((s) => item.productId === s.productId) === index,
      );
      productLST.forEach((i) => {
        this.productList.push({
          id: i.productId,
          name: i.productName,
        });
      });
    },
    setData(sortWay, pod) {
      this.productOrderWay = pod || this.productOrderWay;
      this.sortWay = sortWay || this.sortWay;
      this.productOrdersWithoutPaging(
        this.customerSelected,
        this.productSelected,
        this.sortWay,
        this.productOrderWay,
      );
    },
    // 取到小數點第二位
    secondDecimalPoint(val) {
      const result = Math.round((val + Number.EPSILON) * 100) / 100;
      return result;
    },
    caculateTotal() {
      this.countTotal = this.caculateAll('count');
      this.subtotalTotal = this.caculateAll('subtotal');
      this.handlingFeeTotal = this.caculateAll('handlingFee');
      this.sellTotal = this.caculateAll('sell');
      this.commissionTotal = this.caculateAll('commission');
    },
    caculateAll(propertyKey) {
      const result = this.showList.reduce(
        (p, n) => ({ [propertyKey]: p[propertyKey] + n[propertyKey] }),
        { [propertyKey]: 0 },
      )[propertyKey];
      return result;
    },
    // 處理「小計」
    filter(arg, data) {
      if (arg === 'prodnumber') {
        return this.smallCountProduct.filter((i) => i[arg] === data)[0];
      }
      return this.smallCountDate.filter((i) => i[arg] === this.dtfm(data))[0];
    },
  },
  watch: {
    async startDate() {
      if (!this.startDate) return;
      this.customerSelected = '';
      await this.productOrdersWithoutPaging();
      this.getProductAndCustomer();
    },
    async endDate() {
      if (!this.endDate) return;
      this.productSelected = '';
      await this.productOrdersWithoutPaging();
      this.getProductAndCustomer();
    },
    customerSelected(id) {
      this.customerSelected = id;
      this.productOrdersWithoutPaging(this.customerSelected, this.productSelected);
    },
    productSelected(id) {
      this.productSelected = id;
      this.productOrdersWithoutPaging(this.customerSelected, this.productSelected);
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo']),
    ...mapGetters('userInfo', ['GETTER_MECHANTNAME']),
  },
};
</script>
<style scoped>
.btn-class {
  @apply rounded border px-2 py-1 focus:outline-none;
}
.sheet {
  @apply flex items-center justify-between border-b border-dashed border-gray p-2;
}

.sheet.bg-ml,
.count.sheet {
  @apply border-0;
}
</style>
