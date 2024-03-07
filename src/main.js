import './assets/main.css'
import News from '@/components/News.vue'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

// app.component('News', News);
createApp(App).mount('#app')
