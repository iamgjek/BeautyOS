<template>
  <C-Main-Block>
    <C-Back-Nav></C-Back-Nav>
    <section class="relative p-4">
      <div class="mb-4 flex">
        <h1 class="m-auto text-[17px] font-bold">價目表</h1>
      </div>
      <div class="rounded-[20px] bg-white px-[1rem] py-[2rem] font-sans font-normal text-primary">
        <ul>
          <C-Draggable
            handle=".moveable"
            v-model="BookingItemCategory"
            :disabled="!enabled"
            class="list-group scrollnone mb-4 flex list-none items-center overflow-x-auto pl-0"
            ghost-class="ghost"
            @change="bookingItemCategoryMove"
            @start="dragging = true"
            @end="dragging = false"
          >
            <li
              v-for="category in BookingItemCategory"
              :key="category.id"
              class="flex select-none items-center text-[16px]"
              :class="{ 'border-b-2 border-solid border-primary': seletedTab === category.id }"
              @click="handleCategory(category.id)"
              @keypress="handleCategory(category.id)"
            >
              <p class="flex items-center justify-center whitespace-nowrap p-3">
                <font-awesome-icon
                  icon="fa-solid fa-grip-dots-vertical"
                  class="moveable w-[20px]"
                />
                <span class="px-4">{{ category.name }}</span>

                <img
                  src="@/static/images/price-pencel.svg"
                  @click="updateBookingItemCategory(category)"
                  @keypress="updateBookingItemCategory(category)"
                  alt="pencel"
                  class="h-[16px] w-[20px]"
                />
              </p>
            </li>
            <li>
              <p class="flex whitespace-nowrap p-3">
                <font-awesome-icon
                  icon="fa-regular fa-circle-plus"
                  @click="createBookingItemCategory()"
                />
              </p>
            </li>
          </C-Draggable>
        </ul>
        <!-- -------------------------------- -->
        <template v-if="BookingItemCategory.length !== 0">
          <div class="select-none">
            <div class="flex select-none items-center gap-2">
              <div class="title mr-auto w-[10em] select-none text-ml">服務 / 產品名稱</div>
              <C-Checkbox-Full
                v-model="isSelectAll"
                label="全選"
                labelClass="!text-[14px] !before:w-[15px] !before:h-[15px] !after:left-[7px] "
                class="w-[21%]"
              ></C-Checkbox-Full>

              <img
                src="@/static/images/price-add.svg"
                class="mx-auto h-[16px] w-[16px]"
                @click="createBookingItem()"
                @keypress="createBookingItem()"
                alt=""
              />

              <img
                src="@/static/images/price-upload.svg"
                alt=""
                class="mx-auto h-[16px] w-[16px]"
                @click="changeBookingItemUsing(resultList, true)"
                @keypress="changeBookingItemUsing(resultList, true)"
              />

              <img
                src="@/static/images/price-download.svg"
                alt=""
                class="mx-auto h-[16px] w-[16px]"
                @click="changeBookingItemUsing(resultList, false)"
                @keypress="changeBookingItemUsing(resultList, false)"
              />

              <img
                src="@/static/images/price-trash.svg"
                alt=""
                class="mx-auto h-[16px] w-[16px]"
                @click="deleteBookingItem(resultList)"
                @keypress="deleteBookingItem(resultList)"
              />
            </div>

            <C-Draggable
              handle=".moveable"
              :list="resultList"
              :disabled="!enabled"
              class="list-group select-none"
              ghost-class="ghost"
              @change="bookingItemMove"
              @start="dragging = true"
              @end="dragging = false"
            >
              <div
                class="flex select-none items-center gap-2 border-b border-dashed border-gray py-2"
                v-for="item in resultList"
                :key="item.id"
              >
                <div class="ml-auto w-7/12">
                  <C-Checkbox-Full
                    v-model="item.checked"
                    :label="item.name"
                    :labelClass="{ 'text-[#B4B4B5]': !item.isUsing }"
                    class="!justify-start"
                  ></C-Checkbox-Full>
                </div>
                <div
                  class="w-6/12 text-right text-[14px]"
                  :class="{ 'text-[#B4B4B5]': !item.isUsing }"
                >
                  <span>${{ item.showPrice }}</span>
                </div>

                <div
                  class="w-1/12 text-center"
                  @click="updateBookingItem(item)"
                  @keypress="updateBookingItem(item)"
                >
                  <img
                    src="@/static/images/price-pencel.svg"
                    alt="pencel"
                    class="h-[16px] w-[20px]"
                  />
                </div>
                <div
                  class="w-1/12 text-center"
                  @click="deleteSingleBookingItem(item)"
                  @keypress="deleteSingleBookingItem(item)"
                >
                  <img
                    src="@/static/images/price-trash.svg"
                    alt=""
                    class="mx-auto h-[16px] w-[16px]"
                  />
                </div>
                <div class="moveable w-1/12 text-center">
                  <font-awesome-icon icon="fa-solid fa-grip-dots-vertical" class="mr-1" />
                </div>
              </div>
            </C-Draggable>

            <p class="py-2 text-sm" v-if="resultList.length === 0">
              點擊<font-awesome-icon icon="fa-regular fa-circle-plus" class="mx-1" />新增項目
            </p>
            <p class="py-2 text-sm" v-else>
              拖曳<font-awesome-icon
                icon="fa-solid fa-grip-dots-vertical"
                class="mx-1"
              />符號變更順序
            </p>
          </div>
        </template>
        <template v-else>
          <div>
            <p class="py-2" v-if="resultList.length === 0">
              點擊<font-awesome-icon icon="fa-regular fa-circle-plus" class="mx-1" />新增項目類別
            </p>
          </div>
        </template>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
export default {
  name: 'priceList-index',
  description: '價目表的首頁',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 價目表',
  },

  data() {
    return {
      isSelectAll: false,
      enabled: true,
      seletedTab: '',
      BookingItemCategory: [],
      resultList: [],
    };
  },
  mounted() {
    this.getBookingItemCategory();
  },
  methods: {
    // 取得所有項目清單
    async getBookingItemCategory(seletedTab, mxSort) {
      const resp = await this.$api.getBookingItemCategory();
      const { data, errors } = resp.data;
      if (errors) return;
      this.BookingItemCategory = data.getBookingItemCategory;
      if (data.getBookingItemCategory.length === 0) return;
      const minSort = Math.min(...this.BookingItemCategory.map((p) => p.sort));
      const maxSort = mxSort ? Math.max(...this.BookingItemCategory.map((p) => p.sort)) : null;
      this.seletedTab = seletedTab
        || this.BookingItemCategory.filter((item) => (maxSort ? item.sort === maxSort : item.sort === minSort))[0].id;

      const { bookingItem } = this.seletedTab
        ? this.BookingItemCategory.filter((item) => item.id === this.seletedTab)[0]
        : this.BookingItemCategory.filter((item) => item.sort === 0)[0];
      this.handleBookingItem(bookingItem, false);
    },
    // 新增類別
    async createBookingItemCategory() {
      this.$swal
        .fire({
          title: '新增項目類別',
          input: 'text',
          confirmButtonText: '新增',
          cancelButtonText: '取消',
          showConfirmButton: true,
          showCancelButton: true,
          showCloseButton: true,
          customClass: {
            confirmButton: '!bg-second',
            input: '!w-[50%] !m-auto !text-center !focus:',
            title: '!pb-5',
          },
          preConfirm: (input) => {
            if (input === '') this.$swal.showValidationMessage('請輸入名稱');
          },
        })
        .then(async (res) => {
          if (res.isDismissed) return '';
          if (res.isConfirmed) {
            const input = {
              name: res.value,
            };
            const resp = await this.$api.createBookingItemCategory(input);
            const { data, errors } = resp.data;
            if (errors) return '';
            if (data.createBookingItemCategory) {
              await this.getBookingItemCategory('', true);
              this.$swal.fire({
                icon: 'success',
                title: '編輯成功',
                showConfirmButton: false,
                showCloseButton: true,
                timer: 3000,
                timerProgressBar: true,
              });
            }
          }
          return '';
        });
    },
    // 更新預約項目類別 (刪除類別也在這)
    async updateBookingItemCategory(category) {
      if (category.id !== this.seletedTab) return;
      this.$swal
        .fire({
          title: '編輯或刪除項目',
          input: 'text',
          inputValue: category.name,
          confirmButtonText: '儲存編輯',
          cancelButtonText: '取消',
          denyButtonText: '刪除項目',
          showConfirmButton: true,
          showCancelButton: true,
          showDenyButton: true,
          showCloseButton: true,
          customClass: {
            confirmButton: '!bg-second',
            input: '!w-[50%] !m-auto !text-center',
            title: '!pb-5',
          },
          preConfirm: (input) => {
            if (input === '') this.$swal.showValidationMessage('請輸入名稱');
          },
        })
        .then(async (res) => {
          // 編輯
          // 刪除
          if (res.isDenied) {
            this.$swal
              .fire({
                icon: 'warning',
                html: '<p class="py-3 text-lg">確定要刪除項目嗎？</p>',
                showConfirmButton: true,
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                customClass: {
                  confirmButton: '!bg-second',
                },
              })
              .then(async (rs) => {
                if (rs.isConfirmed) {
                  // 打刪除API
                  const input = {
                    bookingItemCategoryId: category.id,
                  };
                  const resp = await this.$api.deleteBookingItemCategory(input);
                  const { data, errors } = resp.data;
                  if (errors) return;

                  if (data.deleteBookingItemCategory) {
                    await this.getBookingItemCategory('', false);
                    this.$swal.fire({
                      icon: 'success',
                      title: '刪除成功',
                      showConfirmButton: false,
                      showCloseButton: true,
                      timer: 3000,
                      timerProgressBar: true,
                    });
                  }
                }
              });
          }

          if (res.isConfirmed) {
            const submit = {
              input: {
                bookingItemCategoryId: category.id,
                name: res.value,
              },
            };
            const resp = await this.$api.updateBookingItemCategory(submit);
            const { data, errors } = resp.data;
            if (errors) return '';
            if (data.updateBookingItemCategory) {
              await this.getBookingItemCategory(this.seletedTab, false);
              this.$swal.fire({
                icon: 'success',
                title: '編輯成功',
                showConfirmButton: false,
                showCloseButton: true,
                timer: 3000,
                timerProgressBar: true,
              });
            }
          }
          return '';
        });
    },
    // 新增預約項目
    async createBookingItem() {
      // 新增預約項目

      const { value: formValues } = await this.$swal.fire({
        html: `
                <style>
            #up{
                margin-right: -10px;
            }
            .hightest-price {
                display: none;
            }
            input:focus{
              border:1px solid #231815 ;
            }

            #isHighestPrice:checked~.hightest-price {
                display: flex;
            }
        </style>
        <h2 class="text-center text-primary font-sans py-4">新增項目</h2>
 <div class="my-2 text-[14px] flex items-center">
            <label class="w-4/12 inline-block" for="name">項目名稱 <sup class="text-red-500">*</sup></label>
            <input id="name" class=" w-7/12 rounded border border-gray py-1 px-2" placeholder="項目名稱"  />
        </div>
        <div class="my-2 text-[14px] flex items-center">
            <label class="w-4/12 inline-block" for="lowestPrice">最低價 <sup class="text-red-500">*</sup></label>
            <input id="lowestPrice" class="w-4/12 rounded border border-gray py-1 px-2 mr-2" placeholder="最低價格"  />
            <input type="checkbox" id="up" class="w-1/12 rounded border border-gray p-2 my-2" />
            <label class="w-2/12 inline-block my-2" for="up">元起</label>
        </div>
        <div class="my-2 pb-5 text-[14px] flex items-center">
          <label class="w-4/12 inline-block" for="name">預約時長 <sup class="text-red-500">*</sup></label>
        <select  id="timeCost" class="w-7/12 rounded border border-gray py-1 px-2 bg-white">
              <option value="1">半小時</option>
              <option value="2">一小時</option>
              <option value="3">一個半小時</option>
              <option value="4">兩小時</option>
              <option value="5">兩個半小時</option>
              <option value="6">三小時</option>
              <option value="7">三個半小時</option>
              <option value="8">四小時</option>
              <option value="9">四個半小時</option>
              <option value="10">五小時</option>
              <option value="11">五個半小時</option>
              <option value="12">六小時</option>
              <option value="13">六個半小時</option>
              <option value="14">七小時</option>
              <option value="15">七個半小時</option>
              <option value="16">八小時</option>
          </select>
        </div>
        <div class="my-2 pb-5 text-[14px] ">

            <input type="checkbox" id="isHighestPrice" class="w-1/12 rounded border border-gray p-2 my-2 align-middle" />
            <label class="inline-block my-2 align-middle" for="isHighestPrice">輸入最高價</label>


            <div class="hightest-price text-[14px] flex items-center">
                <label class="w-4/12 inline-block" for="highestPrice">最高價</label>
                <input id="highestPrice" class="w-7/12 rounded border border-gray p-2" placeholder="最高價格"  />
            </div>
        </div>
        `,
        focusConfirm: false,
        confirmButtonText: '儲存編輯',
        cancelButtonText: '取消',
        showCancelButton: true,
        customClass: {
          confirmButton: '!bg-second',
        },
        preConfirm: () => {
          const name = document.getElementById('name').value;
          const lowestPrice = document.getElementById('lowestPrice').value;
          const timeCost = document.getElementById('timeCost').value;
          let highestPrice = document.getElementById('highestPrice').value;
          const showHighestPrice = document.getElementById('isHighestPrice').checked;
          const isUp = document.getElementById('up').checked;
          if (!showHighestPrice && highestPrice !== '') highestPrice = '';
          this.examInput(name, lowestPrice, highestPrice);
          if (highestPrice === '' && !isUp) {
            return {
              name,
              lowestPrice,
              highestPrice: lowestPrice,
              timeCost,
            };
          }
          return {
            name,
            lowestPrice,
            highestPrice,
            timeCost,
          };
        },
      });

      if (formValues) {
        const highestPrice = formValues.highestPrice === '' ? null : +formValues.highestPrice;
        const submit = {
          input: {
            bookingItemCategoryId: this.seletedTab,
            name: formValues.name,
            lowestPrice: +formValues.lowestPrice,
            highestPrice,
            timeCost: +formValues.timeCost,
          },
        };
        console.log(submit);
        const resp = await this.$api.createBookingItem(submit);
        const { data, errors } = resp.data;
        if (errors) return '';
        if (data.createBookingItem) {
          await this.getBookingItemCategory(this.seletedTab, false);
          this.$swal.fire({
            icon: 'success',
            title: '新增成功',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 3000,
            timerProgressBar: true,
          });
        }

        return '';
      }
      return '';
    },

    // 修改單一預約項目
    async updateBookingItem(bookingItem) {
      console.log(bookingItem);
      let { name } = bookingItem;
      let { lowestPrice } = bookingItem;
      let { timeCost } = bookingItem;
      let highestPrice = bookingItem.highestPrice ? bookingItem.highestPrice : '';
      let isUsing = bookingItem.isUsing ? 'checked' : '';
      let showHighestPrice = bookingItem.highestPrice === null
        || bookingItem.highestPrice === ''
        || bookingItem.highestPrice === bookingItem.lowestPrice
        ? ''
        : 'checked';
      let isUp = bookingItem.highestPrice === null || bookingItem.highestPrice === '' ? 'checked' : '';
      const { value: formValues } = await this.$swal.fire({
        html: `
        <style>
            #up {
                margin-right: -10px;
            }
            .hightest-price {
                display: none;
            }
            input:focus {
                border: 1px solid #231815;
            }
            #isHighestPrice:checked~.hightest-price {
                display: flex;
            }
        </style>
        <h2 class="text-center text-primary font-sans py-4">編輯項目</h2>
        <div class="my-2 text-[14px] flex items-center">
            <label class="w-4/12 inline-block" for="name">項目名稱 <sup class="text-red-500">*</sup></label>
            <input id="name" class=" w-7/12 rounded border border-gray py-1 px-2" placeholder="項目名稱" value="${name}" />
        </div>
        <div class="my-2 text-[14px] flex items-center">
            <label class="w-4/12 inline-block" for="lowestPrice">最低價 <sup class="text-red-500">*</sup></label>
            <input id="lowestPrice" class="w-4/12 rounded border border-gray py-1 px-2 mr-2" placeholder="最低價" value="${lowestPrice}" />
            <input type="checkbox" id="up" class="w-1/12 rounded border border-gray py-1 px-2 my-2" ${isUp} />
            <label class="w-2/12 inline-block my-2" for="up">元起</label>
        </div>
        <div class="my-2 pb-5 text-[14px] flex items-center">
          <label class="w-4/12 inline-block" for="name">預約時長 <sup class="text-red-500">*</sup></label>
        <select  id="timeCost" class="w-7/12 rounded border border-gray py-1 px-2 bg-white">
          <option value="1" ${timeCost === 1 ? 'selected' : ''}>半小時</option>
          <option value="2" ${timeCost === 2 ? 'selected' : ''}>一小時</option>
          <option value="3" ${timeCost === 3 ? 'selected' : ''}>一個半小時</option>
          <option value="4" ${timeCost === 4 ? 'selected' : ''}>兩小時</option>
          <option value="5" ${timeCost === 5 ? 'selected' : ''}>兩個半小時</option>
          <option value="6" ${timeCost === 6 ? 'selected' : ''}>三小時</option>
          <option value="7" ${timeCost === 7 ? 'selected' : ''}>三個半小時</option>
          <option value="8" ${timeCost === 8 ? 'selected' : ''}>四小時</option>
          <option value="9" ${timeCost === 9 ? 'selected' : ''}>四個半小時</option>
          <option value="10" ${timeCost === 10 ? 'selected' : ''}>五小時</option>
          <option value="11" ${timeCost === 11 ? 'selected' : ''}>五個半小時</option>
          <option value="12" ${timeCost === 12 ? 'selected' : ''}>六小時</option>
          <option value="13" ${timeCost === 13 ? 'selected' : ''}>六個半小時</option>
          <option value="14" ${timeCost === 14 ? 'selected' : ''}>七小時</option>
          <option value="15" ${timeCost === 15 ? 'selected' : ''}>七個半小時</option>
          <option value="16" ${timeCost === 16 ? 'selected' : ''}>八小時</option>
          </select>
        </div>
        <div class="my-2 ">
            <input type="checkbox" id="isHighestPrice" class="w-1/12 rounded border border-gray p-2 my-2 align-middle" ${showHighestPrice} />
            <label class="inline-block my-2 align-middle text-[14px]" for="isHighestPrice">輸入最高價</label>
            <div class="hightest-price text-[14px] flex items-center">
                <label class="w-4/12 inline-block" for="highestPrice">最高價</label>
                <input id="highestPrice" class=" w-7/12 rounded border border-gray py-1 px-2" placeholder="最高價" value="${highestPrice}" />
            </div>
        </div>
        <div class="my-2">
            <input type="checkbox" id="isUsing" class="w-1/12 rounded border border-gray py-1 px-2" ${isUsing} />
            <label class="inline-block text-[14px]" for="isUsing">上架</label>
        </div>
        `,
        confirmButtonText: '儲存編輯',
        cancelButtonText: '取消',
        showConfirmButton: true,
        showCancelButton: true,
        showCloseButton: true,
        customClass: {
          confirmButton: '!bg-second',
        },
        preConfirm: () => {
          name = document.getElementById('name').value;
          lowestPrice = document.getElementById('lowestPrice').value;
          timeCost = document.getElementById('timeCost').value;
          highestPrice = document.getElementById('highestPrice').value;
          isUsing = document.getElementById('isUsing').checked;
          showHighestPrice = document.getElementById('isHighestPrice').checked;
          isUp = document.getElementById('up').checked;
          // 如果沒勾 顯示最高價 ，但最高價有值，清掉最高價
          if (!showHighestPrice && highestPrice !== '') highestPrice = '';
          this.examInput(name, lowestPrice, highestPrice);

          if (highestPrice === '' && !isUp) {
            return {
              name,
              lowestPrice,
              highestPrice: lowestPrice,
              isUsing,
              timeCost,
            };
          }
          return {
            name,
            lowestPrice,
            highestPrice,
            isUsing,
            timeCost,
          };
        },
      });
      if (formValues) {
        highestPrice = formValues.highestPrice === '' ? null : +formValues.highestPrice;
        const submit = {
          input: {
            bookingItemId: bookingItem.id,
            name: formValues.name,
            lowestPrice: +formValues.lowestPrice,
            highestPrice,
            bookingItemCategoryId: this.seletedTab,
            isUsing: formValues.isUsing,
            timeCost: +formValues.timeCost,
          },
        };
        const resp = await this.$api.updateBookingItem(submit);
        const { data, errors } = resp.data;
        if (errors) return '';
        if (data.updateBookingItem) {
          await this.getBookingItemCategory(this.seletedTab, false);
          this.$swal.fire({
            icon: 'success',
            title: '編輯成功',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      }
      return '';
    },
    // 刪除單一項目
    deleteSingleBookingItem(item) {
      this.$swal
        .fire({
          icon: 'warning',
          html: '<p class="py-3 text-lg">確定要刪除項目嗎？</p>',
          confirmButtonText: '確認刪除',
          showConfirmButton: true,
          showCloseButton: true,
          customClass: {
            confirmButton: '!w-[144px] !rounded !bg-second !px-[14px] !py-2 !text-sm !text-white',
          },
        })
        .then(async (res) => {
          if (res.isConfirmed) {
            const deleteBookingItemID = item.id;
            // 打刪除API
            const input = {
              bookingItemId: deleteBookingItemID,
            };
            const resp = await this.$api.deleteBookingItem(input);
            const { data, errors } = resp.data;
            if (errors) return;

            if (data.deleteBookingItem) {
              await this.getBookingItemCategory(this.seletedTab, false);
              this.$swal.fire({
                icon: 'success',
                title: '刪除成功',
                showConfirmButton: false,
                showCloseButton: true,
                timer: 3000,
                timerProgressBar: true,
              });
            }
          }
        });
    },
    // 刪除多個項目
    deleteBookingItem(bookingItem) {
      const checkItem = bookingItem.filter((itm) => itm.checked === true);
      if (checkItem.length === 0) {
        this.$swal.fire({
          icon: 'warning',
          html: '<p class="py-3 text-lg">請至少勾選一個項目</p>',
          showConfirmButton: false,
          showCloseButton: true,
          timer: 1500,
          timerProgressBar: true,
        });
        return;
      }

      this.$swal
        .fire({
          icon: 'warning',
          html: '<p class="py-3 text-lg">確定要刪除項目嗎？</p>',
          confirmButtonText: '確認刪除',
          showConfirmButton: true,
          showCloseButton: true,
          customClass: {
            confirmButton: '!w-[144px] !rounded !bg-second !px-[14px] !py-2 !text-sm !text-white',
          },
        })
        .then(async (res) => {
          if (res.isConfirmed) {
            const deleteBookingItemID = this.resultList
              .filter((el) => el.checked === true)
              .map((el) => el.id);
            // 打刪除API
            const input = {
              bookingItemId: deleteBookingItemID,
            };
            const resp = await this.$api.deleteBookingItem(input);
            const { data, errors } = resp.data;
            if (errors) return;

            if (data.deleteBookingItem) {
              await this.getBookingItemCategory(this.seletedTab, false);
              this.$swal.fire({
                icon: 'success',
                title: '刪除成功',
                showConfirmButton: false,
                showCloseButton: true,
                timer: 3000,
                timerProgressBar: true,
              });
            }
            this.$swal.fire({
              icon: 'success',
              html: '<p class="py-3 text-lg">刪除成功</p>',
              showConfirmButton: false,
              showCloseButton: true,
              timer: 2000,
              timerProgressBar: true,
            });
            this.isSelectAll = false;
          }
        });
    },
    // 上架/下架項目
    async changeBookingItemUsing(bookingItem, using) {
      const checkItem = bookingItem.filter((itm) => itm.checked === true);
      if (checkItem.length === 0) {
        this.$swal.fire({
          icon: 'warning',
          html: '<p class="py-3 text-lg">請至少勾選一個項目</p>',
          showConfirmButton: false,
          showCloseButton: true,
          timer: 1500,
          timerProgressBar: true,
        });
        return;
      }
      this.$swal
        .fire({
          icon: 'warning',
          html: `<p class="py-3 text-lg">確定要${using ? '上架' : '下架'}勾選的項目嗎？</p>`,
          confirmButtonText: '確認',
          showConfirmButton: true,
          showCloseButton: true,
          customClass: {
            confirmButton: '!w-[144px] !rounded !bg-second !px-[14px] !py-2 !text-sm !text-white',
          },
        })
        .then(async (res) => {
          if (res.isConfirmed) {
            const input = checkItem.map((itm) => ({
              bookingItemId: itm.id,
              name: itm.name,
              lowestPrice: itm.lowestPrice,
              highestPrice: itm.highestPrice,
              bookingItemCategoryId: itm.bookingItemCategoryId,
              isUsing: using,
            }));

            const submit = { input };
            const resp = await this.$api.updateBookingItem(submit);
            const { data, errors } = resp.data;
            if (errors) return '';
            if (data.updateBookingItem) {
              await this.getBookingItemCategory(this.seletedTab, false);
              this.$swal.fire({
                icon: 'success',
                title: '編輯成功',
                showConfirmButton: false,
                showCloseButton: true,
                timer: 3000,
                timerProgressBar: true,
              });
              this.isSelectAll = false;
            }
          }
          return '';
        });
    },
    // 移動類別
    async bookingItemCategoryMove() {
      const newBookingItemCategory = this.BookingItemCategory.map((i) => i.id);
      const submit = {
        input: newBookingItemCategory,
      };
      const resp = await this.$api.updateBookingItemCategorySorting(submit);
      const { errors } = resp.data;
      if (errors) return '';
      await this.getBookingItemCategory(this.seletedTab, false);
      return '';
    },
    // 移動項目
    async bookingItemMove() {
      const newBookingItemList = this.resultList.map((i) => i.id);
      const submit = {
        input: newBookingItemList,
      };
      const resp = await this.$api.updateBookingItemSorting(submit);
      const { errors } = resp.data;
      if (errors) return '';
      await this.getBookingItemCategory(this.seletedTab, false);
      return '';
    },

    // 點擊類別頁籤
    handleCategory(id) {
      this.isSelectAll = false;
      this.seletedTab = id;
      const { bookingItem } = this.BookingItemCategory.filter((Category) => Category.id === id)[0];
      this.handleBookingItem(bookingItem, false);
    },
    // 處理顯示的項目，把打勾清掉、根據高價、低價顯示金額
    handleBookingItem(bookingItem, checked) {
      this.resultList = bookingItem.map((item) => {
        const obj = {};
        let showPrice = 0;
        const up = !!(item.highestPrice === null || item.highestPrice === '');
        if (up) showPrice = `${item.lowestPrice} up`;
        else if (item.highestPrice === item.lowestPrice) showPrice = `${item.lowestPrice}`;
        else showPrice = `${item.lowestPrice} ~ ${item.highestPrice}`;
        obj.id = item.id;
        obj.sort = item.sort;
        obj.bookingItemCategoryId = item.bookingItemCategoryId;
        obj.bookingItemCategoryName = item.bookingItemCategoryName;
        obj.name = item.name;
        obj.lowestPrice = item.lowestPrice;
        obj.highestPrice = item.highestPrice;
        obj.showPrice = showPrice;
        obj.checked = checked;
        obj.isUsing = item.isUsing;
        obj.timeCost = item.timeCost;
        return obj;
      });
    },
    isNumeric(val) {
      return /^-?\d+$/.test(val);
    },
    examInput(name, lowestPrice, highestPrice) {
      if (name === '' || name === null || lowestPrice === '' || lowestPrice === null) {
        this.$swal.showValidationMessage('項目名稱、最低價為必填');
      } else if (!this.isNumeric(lowestPrice)) {
        this.$swal.showValidationMessage('請輸入正確的最低價');
      } else if (highestPrice !== '' && highestPrice !== null) {
        if (!this.isNumeric(highestPrice)) this.$swal.showValidationMessage('請輸入正確的最高價');
        else if (+highestPrice < +lowestPrice) this.$swal.showValidationMessage('最高價格不能小於最低價格');
      }
    },
  },
  computed: {},
  watch: {
    isSelectAll() {
      this.handleBookingItem(this.resultList, this.isSelectAll);
    },
  },
};
</script>

<style lang="scss" scoped>
.scrollnone {
  &::-webkit-scrollbar {
    display: none !important;
  }
}

.title {
  text-indent: 0.5em;
  position: relative;
}
.title::before {
  content: "";
  width: 2px;
  height: 1em;
  position: absolute;
  background-color: #231815;
  border-radius: 5px;
  top: 0;
  left: 0;
  bottom: 0;
  margin: auto 0;
}
</style>
