import './App.css';
import { useEffect, useState } from "react";
const imageItems = [
  'https://img2.baidu.com/it/u=2611556848,2555935246&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=750',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdesk-fd.zol-img.com.cn%2Ft_s960x600c5%2Fg5%2FM00%2F02%2F05%2FChMkJ1bKyaOIB1YfAAusnvE99Z8AALIQQPgER4AC6y2052.jpg&refer=http%3A%2F%2Fdesk-fd.zol-img.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1646984421&t=f4ac5cd91bf0312c5e4ef70017dd6adc',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2Fed%2F71%2F81%2Fed7181eadac4adf22b2634e7e1a2c3eb.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1646984421&t=fd1ec76a628f924d6385747c125eab4c',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F911%2F050516120333%2F160505120333-3.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1646984421&t=4b547d4f90335ba5a4fa8a4af4564215',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2020-06-02%2F5ed6127bd683a.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1646984421&t=53dbe07e200860f99606eae6b5af16b7',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F0G520141A4%2F200G5141A4-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1646984421&t=dad368fc97755686b97010be483d710f',
];
const DOCUMENT_TITLE = "Expanding Cards11";
function App() {
  const [currentActive,setCurrentActive] = useState(0);
  const onChangeHandler = (index) => setCurrentActive(index);
  useEffect(() => {
      if(document.title !== DOCUMENT_TITLE){
         document.title = DOCUMENT_TITLE;
      }
  });
  return (
    <div className="app">
       {
         imageItems.map((item,index) => (
           <div 
              className={`panel ${currentActive === index ? "active" : "" }`} 
              style={{ backgroundImage:`url(${ item })`}} 
              onClick={ onChangeHandler.bind(this,index) }
              key={ item + index}
            >
              girl { item.slice(-5,item.length - 4)}
          </div>
         ))
       }
    </div>
  );
}

export default App;
