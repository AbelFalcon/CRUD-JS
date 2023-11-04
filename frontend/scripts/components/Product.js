import { html } from '../modules/element.js'

const Product = ({ title, description, price, discountPercentage, stock }) => html`
    <div
      class="product bg-zinc-950 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
    >
      <div class="p-6">
        <h2 class="text-lg text-white font-bold title-font mb-2" id="title">
          ${title}
        </h2>
        <hr class="h-px my-7 bg-zinc-500 border-0" />
        <p class="leading-relaxed text-base text-white" id="description">
          ${description}
        </p>

        <div class="mt-4">
          <span
            class="title-font font-bold text-white text-2xl text-white-900"
            id="price"
            >${price}</span
          >
          <span class="text-sm line-through text-white" id="discount"
            >${discountPercentage}</span
          >
        </div>

        <div class="mt-4">
          <span class="text-white font-bold">Stock: </span>
          ${stock &&
            '<span class="text-green-500 font-bold" id="stock">Disponible</span>'
          }
        </div>

        <div class="mt-4">
          <button
            id="delete-product"
            class="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"
              />
            </svg>
          </button>
          <button
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
          corporis           id="edit-product"
            class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
`
export default Product
