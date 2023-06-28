import React from 'react';
import bb from '../files/lg.png'
import pre from '../files/pre1.jpeg';
import p from '../files/123.jpg';
import z from '../files/pre2.jpg';
const Home = () => {
  return (
    <>
    <div className='flex justify-evenly items-center'>
      <div>
      <h2 className="text-4xl font-bold text-gray-800 mb-8">STAY HOME, STAY SAFE</h2>
      <p>Ultimately, the greatest lesson that COVID-19 can teach humanity is that
      <p className='text-lg text-gray-900 items-center justify-center font-extrabold'>     We ARE ALL IN THIS TOGETHER.</p> </p>
      </div>
      
      <img className="w-6/12 h-50"src={bb} alt='content'></img>
      </div>
    <div className="min-h-screen bg-gray-100">
      <div  id="Symptons"className="container mx-auto px-4 py-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg">
            <img src={pre} alt="c1" className="rounded-t-lg w-full" />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">COVID-19 Vaccines</h2>
              <p className="text-gray-700">Learn more about the COVID-19 vaccines and their effectiveness in preventing the virus.</p>


              <h3 className="text-mb font-semibold mb-2">Novavax protein subunit COVID-19 vaccine</h3>
              <p className="text-gray-900">
              Protein subunit vaccines contain pieces (proteins) of the virus that causes COVID-19. The virus pieces are the spike protein. The Novavax COVID-19 vaccine contains another ingredient called an adjuvant. It helps the immune system respond to that spike protein. After learning how to respond to the spike protein, the immune system will be able to respond quickly to the actual virus spike protein and protect you against COVID-19.
               </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg">
            <img src={p} alt="Im" className="rounded-t-lg w-full" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Symptoms of COVID-19</h3>
              <p className="text-gray-700">Find out about the common symptoms of COVID-19 and what to watch out for.</p>

              <p className="text-gray-900"> Signs and symptoms of coronavirus disease 2019 (COVID-19) may appear 2 to 14 days after exposure. This time after exposure and before having symptoms is called the incubation period. You can still spread COVID-19 before you have symptoms (presymptomatic transmission). Common signs and symptoms can include:
              Fever,Cough, Soar throat, Tiredness<br/>
              <br/></p>
              
          
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg">
            <img src={z} alt="Im" className="rounded-t-lg w-full" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Preventing COVID-19</h3>
              <p className="text-gray-700">Discover the essential precautions and measures to take to prevent the spread of COVID-19.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">About COVID-19</h2>
      <p className="text-lg mb-8">COVID-19, also known as the coronavirus disease, is a highly contagious respiratory illness caused by the severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) virus. It was first identified in December 2019 in Wuhan, China, and has since evolved into a global pandemic. 

      COVID-19 spreads primarily through respiratory droplets when an infected person coughs, sneezes, talks, or breathes. Common symptoms include fever, cough, fatigue, body aches, loss of taste or smell, and difficulty breathing. While many individuals experience mild to moderate symptoms, the virus can cause severe illness, especially among older adults and those with underlying health conditions.
      
      To combat the spread of COVID-19, various preventive measures have been implemented globally, including widespread testing, contact tracing, social distancing, mask-wearing, and frequent hand hygiene. Vaccines have also been developed and authorized for emergency use, offering hope for reducing the severity and spread of the disease.
      
      The COVID-19 pandemic has had profound social, economic, and health impacts worldwide. It has strained healthcare systems, disrupted economies, led to lockdowns and travel restrictions, and caused loss of lives and livelihoods. Efforts continue to mitigate the effects of the pandemic through vaccination campaigns, public health measures, and ongoing research and monitoring of the virus and its variants.</p>
    </div>
    </>
  );
};

export default Home;
