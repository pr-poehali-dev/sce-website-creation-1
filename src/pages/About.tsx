import React from 'react';
import Layout from '@/components/Layout';
import { Shield, Lock, Search, Users, Building, FileText } from 'lucide-react';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Shield className="inline-block h-16 w-16 text-sce-primary mb-4" />
          <h1 className="text-3xl font-bold mb-4">О Фонде SCE</h1>
          <p className="text-xl text-sce-secondary max-w-3xl mx-auto">
            Secure. Control. Explore. Мы защищаем мир от аномальных угроз и изучаем необъяснимые явления.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Наша миссия</h2>
            <p className="text-sce-secondary mb-4">
              Фонд SCE создан для обнаружения, сдерживания и изучения аномальных объектов, сущностей и явлений, 
              которые представляют угрозу для нормального течения современной реальности. Мы стремимся защитить 
              человечество от потенциальных угроз и расширить границы научного познания.
            </p>
            <p className="text-sce-secondary">
              Наша деятельность основана на трех основных принципах: обеспечение безопасности (Secure), 
              контроль над аномалиями (Control) и изучение неизвестного (Explore).
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">История организации</h2>
            <p className="text-sce-secondary mb-4">
              Фонд SCE был создан в середине XX века группой ученых и представителей военных структур различных 
              стран, столкнувшихся с необъяснимыми явлениями. Начав как небольшая исследовательская группа, 
              сегодня Фонд SCE представляет собой глобальную организацию с объектами и персоналом по всему миру.
            </p>
            <p className="text-sce-secondary">
              За свою историю Фонд SCE предотвратил множество потенциальных катастроф глобального масштаба 
              и значительно расширил понимание человечеством фундаментальных законов вселенной.
            </p>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Основные направления деятельности</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-sce-lightgray rounded-sm p-6 bg-white">
              <Lock className="h-12 w-12 text-sce-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Сдерживание</h3>
              <p className="text-sce-secondary">
                Разработка и реализация протоколов по безопасному содержанию аномальных объектов 
                и предотвращению их влияния на окружающий мир.
              </p>
            </div>
            
            <div className="border border-sce-lightgray rounded-sm p-6 bg-white">
              <Search className="h-12 w-12 text-sce-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Исследование</h3>
              <p className="text-sce-secondary">
                Научное изучение аномальных объектов для понимания их природы, принципов работы и 
                возможного практического применения полученных знаний.
              </p>
            </div>
            
            <div className="border border-sce-lightgray rounded-sm p-6 bg-white">
              <FileText className="h-12 w-12 text-sce-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Документирование</h3>
              <p className="text-sce-secondary">
                Тщательная классификация и документирование всех известных аномалий для создания 
                комплексной базы знаний и обеспечения безопасности персонала.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Структура организации</h2>
          <div className="border border-sce-lightgray rounded-sm p-8 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Building className="h-12 w-12 text-sce-primary mb-4" />
                <h3 className="text-xl font-bold mb-4">Объекты и комплексы</h3>
                <p className="text-sce-secondary mb-3">
                  Фонд SCE располагает сетью специализированных объектов по всему миру:
                </p>
                <ul className="list-disc list-inside text-sce-secondary space-y-1 ml-2">
                  <li>Исследовательские центры</li>
                  <li>Объекты содержания</li>
                  <li>Административные комплексы</li>
                  <li>Логистические центры</li>
                  <li>Тренировочные базы</li>
                </ul>
              </div>
              
              <div>
                <Users className="h-12 w-12 text-sce-primary mb-4" />
                <h3 className="text-xl font-bold mb-4">Персонал</h3>
                <p className="text-sce-secondary mb-3">
                  В Фонде SCE работают специалисты различных профилей:
                </p>
                <ul className="list-disc list-inside text-sce-secondary space-y-1 ml-2">
                  <li>Научные сотрудники и исследователи</li>
                  <li>Оперативный персонал</li>
                  <li>Специалисты по содержанию</li>
                  <li>Административный персонал</li>
                  <li>Медицинский персонал</li>
                  <li>Полевые агенты</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-sce-lightgray p-8 rounded-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Участие в проекте</h2>
          <p className="text-sce-secondary mb-6 text-center max-w-3xl mx-auto">
            Фонд SCE приглашает талантливых исследователей, писателей и энтузиастов принять участие 
            в развитии нашей вселенной. Вы можете внести свой вклад, создавая описания новых SCE-объектов, 
            исследовательские отчеты и другие материалы.
          </p>
          <div className="text-center">
            <a 
              href="/register" 
              className="inline-block bg-sce-primary text-white font-semibold px-6 py-3 rounded-sm hover:bg-sce-secondary transition-colors"
            >
              Присоединиться к SCE Foundation
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
