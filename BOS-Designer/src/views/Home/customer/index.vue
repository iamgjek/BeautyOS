<template>
  <C-Main-Block>
    <C-Back-Nav></C-Back-Nav>
    <section class="relative p-4">
      <div class="mb-4 flex">
        <h1 class="m-auto text-[17px] font-bold">客戶資料查詢</h1>
      </div>
      <div class="mb-4 flex items-center justify-between">
        <C-Input
          v-model="submitForm.searchInput"
          @input="doInitSearch"
          :placeholder="'搜尋姓名、手機、代號'"
          class="mb-0 mr-2 w-full"
        >
          <template v-slot:endIcon>
            <font-awesome-icon
              v-if="submitForm.searchInput !== ''"
              @click="(submitForm.searchInput = ''), doInitSearch()"
              icon="fa-regular fa-xmark"
              class="text-rose-600"
            />
            <font-awesome-icon icon="fa-regular fa-magnifying-glass" />
          </template>
        </C-Input>
        <font-awesome-icon
          icon="fa-regular fa-filter-list"
          class="text-2xl"
          @click="isActiveFilter = !isActiveFilter"
        />
      </div>
      <!-- eslint-disable-next-line -->
      <div class="rounded-[10px] bg-white px-[1rem] py-[2rem] font-sans font-normal">
        <div
          v-for="(item, index) in resultList"
          :key="`result${index}`"
          class="mb-2 flex items-center justify-between border-b border-dashed border-[#ccc] pb-2"
          @click="doRoute(item)"
          @keypress="doRoute(item)"
        >
          <!-- <div class="w-2/12">{{ +index + 1 > 9 ? +index + 1 : `0${+index + 1}` }}</div> -->
          <div class="w-2/12 overflow-hidden text-ellipsis whitespace-nowrap">
            {{ item.name ? item.name : "--" }}
          </div>
          <div class="w-6/12">{{ item.cellphone }}</div>
          <!-- <div class="w-3/12 text-right">
          <span v-if="item.birthday">
            {{ item.birthday.year && item.birthday.year !== "0" ? `${item.birthday.year}/` : ""
            }}{{
              item.birthday.month && item.birthday.month !== "0"
                ? `${item.birthday.month}/`
                : "--."
            }}{{ item.birthday.day && item.birthday.day !== "0" ? item.birthday.day : "--" }}
          </span>
        </div> -->
          <font-awesome-icon icon="fa-solid fa-angle-right" class="w-1/12" />
        </div>
      </div>
    </section>

    <C-Filter-Wrap
      v-model="isActiveFilter"
      :searchAdvanceCtx="searchAdvanceCtx"
      @doFunction="doInitSearch(true)"
      @clearFunction="clearSearchAdvanceCtx"
    ></C-Filter-Wrap>
  </C-Main-Block>
</template>

<script>
import { mapState } from 'vuex';
// eslint-disable-next-line no-unused-vars
import month from '@/assets/constant/month';

const searchAdvanceCtxTemplate = {
  year: '',
  month: '',
  day: '',
  customerIsCome: null,
  consumptionRange: {
    startDate: '',
    endDate: '',
  },
  baseDateRange: {
    baseDate: '',
    toDate: '',
    dayNumber: '',
  },
  designer: {
    latestDesignerSelected: '',
    latestDesigner: [{ name: '請選擇', id: '' }],
    preferDesignerSelected: '',
    preferDesigner: [{ name: '請選擇', id: '' }],
  },
};
export default {
  name: 'customer-index',
  description: '客戶資料查詢的首頁',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 客戶資料查詢',
  },
  mounted() {
    this.init();
  },
  // 離開頁面取消監聽事件
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollDoSearch);
  },
  data() {
    return {
      isActiveFilter: false,
      submitForm: {
        searchInput: '',
        pageOffset: 0,
        isEnd: false,
      },
      totalPage: 0,
      isGetting: false,
      searchAdvanceCtx: {
        year: '',
        month: '',
        day: '',
        customerIsCome: null,
        consumptionRange: {
          startDate: '',
          endDate: '',
        },
        baseDateRange: {
          baseDate: '',
          toDate: '',
          dayNumber: '',
        },
        designer: {
          latestDesignerSelected: '',
          latestDesigner: [],
          preferDesignerSelected: '',
          preferDesigner: [],
        },
      },
      resultList: [],
      isloading: false,
    };
  },
  methods: {
    async init() {
      await this.doSearch();
      await this.getAllDesigner();
    },
    async clearSearchAdvanceCtx() {
      this.searchAdvanceCtx = JSON.parse(JSON.stringify(searchAdvanceCtxTemplate));
    },
    doRoute(item) {
      this.$router.push({ name: 'Customer-UserInfo', query: { id: item.id } });
    },
    // 搜尋框搜尋
    doInitSearch(type) {
      const lastTimeVal = this.submitForm.searchInput;
      setTimeout(
        () => {
          if (lastTimeVal === this.submitForm.searchInput) {
            this.submitForm.pageOffset = 0;
            this.doSearch();
          }
        },
        type ? 0 : 500,
      );
    },
    async doSearch() {
      const submitForm = {
        // merchantId: this.currentMechantId,
        keyword: this.submitForm.searchInput,
        pageOffset: this.submitForm.pageOffset,
        pageLimit: 20,
        customerIsCome: this.searchAdvanceCtx.customerIsCome,
        preferDesigner: this.searchAdvanceCtx.designer.preferDesignerSelected,
        latestDesigner: this.searchAdvanceCtx.designer.latestDesignerSelected,
      };
      if (this.searchAdvanceCtx.year !== '' || this.searchAdvanceCtx.month !== '') {
        submitForm.birthday = {};
        submitForm.birthday.year = `${this.searchAdvanceCtx.year}`;
        submitForm.birthday.month = month.find((item) => item.label === this.searchAdvanceCtx.month)
          ? month.find((item) => item.label === this.searchAdvanceCtx.month).value
          : '';
        submitForm.birthday.day = '';
      }

      if (this.searchAdvanceCtx.consumptionRange.startDate !== '') {
        submitForm.consumptionRange = {};
        submitForm.consumptionRange.startDate = this.searchAdvanceCtx.consumptionRange.startDate;
        submitForm.consumptionRange.endDate = this.searchAdvanceCtx.consumptionRange.endDate;
      }
      if (this.searchAdvanceCtx.baseDateRange.baseDate !== '') {
        submitForm.baseDateRange = {};
        submitForm.baseDateRange.baseDate = this.searchAdvanceCtx.baseDateRange.baseDate;
      }
      if (this.searchAdvanceCtx.baseDateRange.toDate !== '') {
        if (submitForm.baseDateRange) {
          submitForm.baseDateRange.toDate = this.searchAdvanceCtx.baseDateRange.toDate;
        } else {
          submitForm.baseDateRange = {};
          submitForm.baseDateRange.toDate = this.searchAdvanceCtx.baseDateRange.toDate;
        }
      }
      if (this.searchAdvanceCtx.baseDateRange.dayNumber !== '') {
        if (submitForm.baseDateRange) {
          submitForm.baseDateRange.dayNumber = Number(
            this.searchAdvanceCtx.baseDateRange.dayNumber,
          );
        } else {
          submitForm.baseDateRange = {};
          submitForm.baseDateRange.dayNumber = Number(
            this.searchAdvanceCtx.baseDateRange.dayNumber,
          );
        }
      }
      const resp = await this.$api.customersWithoutSorting(submitForm);
      const { data, errors } = resp.data;

      if (errors) return;
      console.log(data);
      this.totalPage = Math.ceil(data.customersWithoutSorting.totalCount / 20) - 1;
      this.submitForm.isEnd = Math.ceil(data.customersWithoutSorting.totalCount / 20) === 1;
      this.resultList = data.customersWithoutSorting.customers;

      if (this.submitForm.pageOffset < this.totalPage) window.addEventListener('scroll', this.scrollDoSearch);
      this.isActiveFilter = false;
    },
    // 滾動加載
    async scrollDoSearch() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

      if (
        !this.submitForm.isEnd
        && !this.isGetting
        && scrollTop + windowHeight >= scrollHeight - 50
      ) {
        this.isGetting = true;
        this.submitForm.pageOffset += 1;

        if (this.submitForm.pageOffset >= this.totalPage) {
          this.submitForm.isEnd = true;
          window.removeEventListener('scroll', this.scrollDoSearch);
        }

        const submitForm = {
          merchantId: this.currentMechantId,
          keyword: this.submitForm.searchInput,
          pageOffset: this.submitForm.pageOffset,
          pageLimit: 20,
        };

        const resp = await this.$api.customers(submitForm);
        const { data, errors } = resp.data;

        if (errors) return;

        this.isGetting = false;
        this.resultList = this.resultList.concat(data.customers.customers);
      }
    },
    async getAllDesigner() {
      const ML_DESIGN = JSON.parse(localStorage.getItem('ML_DESIGN'));
      const auth = ML_DESIGN.userAuthorizeList.filter((item) => item.pageName === '可查詢全店客資');
      const input = {
        MerchantId: ML_DESIGN.currentMechantId,
        usagelimit: 'EMPLOYEE_LIST',
      };
      const thisUser = [
        { id: '', name: '請選擇' },
        {
          id: ML_DESIGN.user.id,
          name: ML_DESIGN.user.name,
        },
      ];

      if (!auth[0].authority) {
        this.searchAdvanceCtx.designer.latestDesigner = thisUser;
        this.searchAdvanceCtx.designer.preferDesigner = thisUser;
        searchAdvanceCtxTemplate.designer.latestDesigner = thisUser;
        searchAdvanceCtxTemplate.designer.preferDesigner = thisUser;
      } else {
        const resp = await this.$api.users(input);
        const { data, errors } = resp.data;
        if (errors) return;
        data.users.users.unshift({ id: '', name: '請選擇' });
        this.searchAdvanceCtx.designer.latestDesigner = data.users.users;
        this.searchAdvanceCtx.designer.preferDesigner = data.users.users;
        searchAdvanceCtxTemplate.designer.latestDesigner = data.users.users;
        searchAdvanceCtxTemplate.designer.preferDesigner = data.users.users;
      }
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo', 'currentMechantId']),
    isReviewResult() {
      return this.reviewResult.length;
    },
    isOrderResult() {
      return this.orderResult.length;
    },
  },
};
</script>

<style></style>
