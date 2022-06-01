import React from 'react';
import './Footer.css'

const Footer = () => {
   return (
     <div className='footer'>
        <div className="container">
           <div className="row justify-content-around">
              <div className="col-2">
                 <div className="footer-logo-img">
                    <img src='https://upload.wikimedia.org/wikipedia/commons/8/89/Tmdb.new.logo.svg' alt="" width={200} height={94}/>
                 </div>
              </div>
              <div className="col-2">
                 <h2 className='footer-link-title'>Главное</h2>
                 <p className='footer-link-subtitle'> O TMDB</p>
                 <p className='footer-link-subtitle'> Связаться с нами</p>
                 <p className='footer-link-subtitle'>Форумы поддержки</p>
                 <p className='footer-link-subtitle'>API</p>
                 <p className='footer-link-subtitle'>Статус системы</p>
              </div>
              <div className="col-2">
                 <h2 className='footer-link-title'>Участвуйте</h2>
                 <p className='footer-link-subtitle'> Писание об участии</p>
                 <p className='footer-link-subtitle'> Добавить новый фильм</p>
                 <p className='footer-link-subtitle'>Добавить новый сериал</p>
              </div>
              <div className="col-2">
                 <h2 className='footer-link-title'>СООБЩЕСТВО</h2>
                 <p className='footer-link-subtitle'>Руководства</p>
                 <p className='footer-link-subtitle'>Обсуждения</p>
                 <p className='footer-link-subtitle'>Доска почёта</p>
                 <p className='footer-link-subtitle'>Twitter</p>

              </div>
              <div className="col-3">
                 <h2 className='footer-link-title'>О ПРАВЕ</h2>
                 <p className='footer-link-subtitle'> Условия использования</p>
                 <p className='footer-link-subtitle'> API Правила использования</p>
                 <p className='footer-link-subtitle'>Политика конфиденциальности</p>
              </div>
           </div>
        </div>
     </div>
   );
};

export default Footer;