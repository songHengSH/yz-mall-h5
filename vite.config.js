import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { resolve } from 'path'  // 添加这行导入

// 如果使用 pxToViewport，需要取消注释并安装对应包
// import pxToViewport from 'postcss-px-to-viewport'

// 定义 viewport 安全属性列表
// const viewportSafePropList = ['*']

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const HOST = env.VITE_API_HOST
  console.log('当前环境:::',HOST)
  return {
    plugins: [
      vue(),
      Unocss(),
    ],
    build: {
      target: 'es2015',
      minify: 'terser',
      cssTarget: 'chrome61'
    },
    // 如果需要开发服务器配置，取消注释
    // server: {
    //   port: 8865,
    //   proxy: {
    //     '/api': {
    //       target: HOST,
    //       changeOrigin: true
    //     },
    //     '/minio': {
    //       target: HOST,
    //       changeOrigin: true
    //     }
    //   }
    // },
    css: {
      postcss: {
        plugins: [
          pxToViewport({
            viewportWidth: 375,
            exclude: [/^(?!.*node_modules\/vant)/],
            propList: viewportSafePropList
          }),
          pxToViewport({
            viewportWidth: 750,
            exclude: [/node_modules\/vant/i],
            propList: viewportSafePropList
          })
        ]
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/layout.scss";`
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@api': resolve(__dirname, 'src/api'),
        '@ass': resolve(__dirname, 'src/assets'),
        '@comp': resolve(__dirname, 'src/components')
      }
    }
  }
})