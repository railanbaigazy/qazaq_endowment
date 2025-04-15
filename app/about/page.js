"use client";

import { useContext, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LanguageContext } from "../../context/LanguageContext";
import { useGSAP } from "@gsap/react";

const faqData = [
    {
        id: 1,
        question_en: "What is the social importance of the project?",
        answer_en:
            "Qazaq Endowment aims to reduce educational inequality in Kazakhstan by supporting rural schools and kindergartens, advancing charity culture, and encouraging educational investment.",
        question_kk: "Жобаның қоғамдық маңызы қандай?",
        answer_kk:
            "Қазақстандағы білім беру саласындағы теңсіздікті азайту, ауыл мектептері мен балабақшалардың сапасын арттыру және қайырымдылық мәдениетін дамыту арқылы қоғамда өзгеріс жасау.",
    },
    {
        id: 2,
        question_en: "Who is this project for?",
        answer_en:
            "This project is designed for rural schools and kindergartens, philanthropists eager to help, and sponsors interested in investing in education.",
        question_kk: "Бұл жоба кімдерге арналған?",
        answer_kk:
            "Ауылдық мектептер мен балабақшаларға, оқушылардың білім алуына көмектескісі келетін қайырымды жандарға, және білім саласына инвестиция салғысы келетін демеушілерге арналған.",
    },
    {
        id: 3,
        question_en: "How can a project be submitted?",
        answer_en:
            "School administrations or responsible persons can register, provide project details (description, required funds, timeline) and submit a proposal. After approval, the project is published on the site.",
        question_kk: "Қалай жоба қосуға болады?",
        answer_kk:
            "Мектеп әкімшілігі немесе жауапты тұлғалар тіркеліп, жобаның сипаттамасын, қажетті соманы, жинау мерзімін көрсете отырып өтінім жібереді. Жоба мақұлданған соң, ол сайтта жарияланады.",
    },
    {
        id: 4,
        question_en: "What if a project does not raise the required funds?",
        answer_en:
            "Project owners may use the collected funds for the intended purpose or opt to return the funds to donors.",
        question_kk: "Егер жоба қажетті соманы жинай алмаса, не болады?",
        answer_kk:
            "Жоба иелері жиналған қаражатты мақсатқа сәйкес пайдалана алады немесе донорларға қайтару опциясын таңдай алады.",
    },
    {
        id: 5,
        question_en: "Is the platform legitimate?",
        answer_en:
            "Yes, Qazaq Endowment operates under Kazakhstan’s laws with complete transparency, and all financial operations are publicly reported.",
        question_kk: "Бұл платформа заңды ма?",
        answer_kk:
            "Иә, Qazaq Endowment Қазақстан заңнамасына сәйкес жұмыс істейді, барлық қаржы операциялары ашық жүргізіліп, есептер жарияланады.",
    },
    {
        id: 6,
        question_en: "Can I see how my donation was spent?",
        answer_en:
            "Absolutely. Every project publishes financial reports along with photo and video updates, so you always know where your funds went.",
        question_kk: "Мен өзімнің қайырымдылық көмегімнің қалай жұмсалғанын көре аламын ба?",
        answer_kk:
            "Иә, әр жоба қаржы есебін, фото және видео есептерін жариялап отырады.",
    },
    {
        id: 7,
        question_en: "Who can participate in the project?",
        answer_en:
            "Rural schools and kindergartens, volunteers and charity organizations, and any individual sponsor or citizen willing to help.",
        question_kk: "Жобаға кімдер қатыса алады?",
        answer_kk:
            "Қазақстандағы ауыл мектептері мен балабақшалар, волонтерлер мен қайырымдылық қорлары, сондай-ақ көмектескісі келетін кез келген азаматтар.",
    },
    {
        id: 8,
        question_en:
            "How does Qazaq Endowment differ from other charity platforms?",
        answer_en:
            "We are exclusively focused on education in rural areas and place a strong emphasis on transparency by publishing detailed financial reports for every project.",
        question_kk:
            "Qazaq Endowment-тің басқа қайырымдылық платформаларынан айырмашылығы қандай?",
        answer_kk:
            "Біз тек білім беру саласына бағытталғанбыз және ауылдық жерлерге басымдық береміз. Әр жоба өз қаржы есебін жариялайтындығымен ерекшеленеміз.",
    },
    {
        id: 9,
        question_en: "What technologies are used to build the website?",
        answer_en:
            "The website is built with HTML, CSS, JavaScript and frameworks like Angular. Data storage may rely on PostgreSQL or Firebase.",
        question_kk: "Веб-сайт қандай технологиялармен жасалады?",
        answer_kk:
            "Веб-сайт HTML, CSS, JavaScript, Angular немесе басқа таңдалған технологиялар арқылы жасалады. Деректерді сақтау үшін PostgreSQL немесе Firebase қолданылуы мүмкін.",
    },
    {
        id: 10,
        question_en: "How is security ensured?",
        answer_en:
            "We use HTTPS, verified payment systems, blockchain technology, and strong data encryption to protect user information.",
        question_kk: "Қауіпсіздік мәселелері қалай шешіледі?",
        answer_kk:
            "Сайтта HTTPS протоколы, тексерілген төлем жүйелері және блокчейн технологиясы қолданылады, ал деректер шифрлау арқылы қорғалады.",
    },
    {
        id: 11,
        question_en: "What functionalities does the website offer?",
        answer_en:
            "Schools can post and track projects; donors can make contributions and review spending; administrators can moderate projects and generate reports.",
        question_kk: "Веб-сайтта қандай функционалдар бар?",
        answer_kk:
            "Мектептер мен балабақшаларға: жоба жариялау және қаржы жинауды қадағалау; донорларға: қайырымдылық жасау және қаржы есебін қарау; әкімшілікке: жобаларды модерациялау және есеп беру.",
    },
    {
        id: 12,
        question_en: "How is the project financed?",
        answer_en:
            "Initially volunteer-driven, the project will later evolve into a self-financing model through sponsorships and platform commissions.",
        question_kk: "Бұл жоба қалай қаржыландырылады?",
        answer_kk:
            "Бастапқы кезеңде волонтерлік негізде іске асады, кейін демеушілер тарту және комиссиялық төлемдер арқылы өзін-өзі қаржыландыру жүйесіне көшеді.",
    },
    {
        id: 13,
        question_en: "How are fraudulent projects detected?",
        answer_en:
            "Projects undergo a strict moderation process. Only officially registered educational institutions can post projects—with supporting documentation required.",
        question_kk:
            "Егер біреу алаяқтық жасап, жалған жоба жарияласа, оны қалай анықтайсыздар?",
        answer_kk:
            "Жобалар қатаң модерациядан өтеді. Тек ресми тіркелген білім беру мекемелері ғана жоба жариялай алады, және әр жобаға құжаттық дәлелдер қажет.",
    },
    {
        id: 14,
        question_en:
            "How many people are behind the project and what are their roles?",
        answer_en:
            "The team includes developers (website creation and maintenance), content managers (project review), and communication specialists (liaising with donors and schools).",
        question_kk:
            "Бұл жобаны қанша адам жасайды және олардың міндеттері қандай?",
        answer_kk:
            "Жобада әзірлеушілер, контент-менеджерлер және қоғаммен байланыс мамандары жұмыс істейді: веб-сайтты жасау, жобалардың сипаттамасын тексеру және мектептер мен донорлармен ынтымақтастық орнату.",
    },
    {
        id: 15,
        question_en: "What is the future development plan?",
        answer_en:
            "Phase 1: Nationwide launch; Phase 2: Mobile app development; Phase 3: Attracting educational grants, scholarships, and long-term sponsors.",
        question_kk: "Жобаның болашақ дамуы қалай жоспарланған?",
        answer_kk:
            "Бірінші кезең: Қазақстан бойынша іске қосу; Екінші кезең: мобильді қосымша жасау; Үшінші кезең: білім гранттары, стипендиялар және ұзақ мерзімді демеушілер тарту.",
    },
    {
        id: 16,
        question_en: "Why focus on this issue?",
        answer_en:
            "Rural schools face financial and infrastructural challenges compared to urban ones. We aim to improve education quality and provide equal opportunities for every child.",
        question_kk: "Неліктен дәл осы мәселені шешуге көңіл бөлдіңіз?",
        answer_kk:
            "Ауылдық жерлердегі мектептер мен балабақшалар қала мекемелерінен қаржылық және инфрақұрылымдық тұрғыдан артта қалғандықтан, білім сапасын арттырып, балаларға тең мүмкіндік беру мақсатымыз бар.",
    },
    {
        id: 17,
        question_en: "Why donate through this platform?",
        answer_en:
            "Our platform is built on transparency and accountability, allowing donors to clearly see where their contributions are used via published financial reports.",
        question_kk: "Неліктен адамдар сіздің платформаңыз арқылы қайырымдылық жасауы керек?",
        answer_kk:
            "Біздің платформа ашықтық пен есептілікке негізделген, әр жоба қаржы есебін жариялайды, және донорлар қайда көмектескенін нақты бақылай алады.",
    },
    {
        id: 18,
        question_en: "Will the platform operate long-term?",
        answer_en:
            "Yes. Although it starts on a volunteer basis, it will later transition to a self-sustaining model via sponsors, government support, and small commissions.",
        question_kk: "Бұл платформа ұзақ мерзімді жұмыс істей ала ма?",
        answer_kk:
            "Иә, бастапқыда волонтерлік негізде іске асады, кейін демеушілер, мемлекеттік қолдау және шағын комиссиялық төлемдер арқылы өзін-өзі қаржыландыру жүйесіне көшеді.",
    },
    {
        id: 19,
        question_en: "What happens after a project is completed?",
        answer_en:
            "The platform is continuously upgraded with new features—such as educational grants, library funds, and digital resources—to further support the community.",
        question_kk: "Жоба аяқталғаннан кейін не болады?",
        answer_kk:
            "Платформа үнемі жаңартылып, студенттер мен оқытушыларға арналған білім гранттары, кітапхана қоры және цифрлық білім беру ресурстары сияқты жаңа мүмкіндіктер қосылады.",
    },
    {
        id: 20,
        question_en: "Is there a plan to scale the project?",
        answer_en:
            "Yes, we will first operate nationwide and later consider expanding to other Central Asian countries.",
        question_kk: "Болашақта жобаны масштабтау жоспары бар ма?",
        answer_kk:
            "Иә, алдымен Қазақстан бойынша жұмыс істейміз, кейінірек Орталық Азия елдеріне таралу мүмкіндігін қарастырамыз.",
    },
    {
        id: 21,
        question_en: "Do I need any special skills to use the platform?",
        answer_en:
            "No, the interface is designed to be simple and user-friendly so that school administrators and teachers can easily post projects and manage fundraising.",
        question_kk: "Платформаны пайдалану үшін арнайы дағдылар қажет пе?",
        answer_kk:
            "Жоқ, интерфейс қарапайым және пайдаланушыға ыңғайлы етіп жасалған, мектеп әкімшілігі немесе мұғалімдер жобаны оңай қосып, қаржы жинауды бастайды.",
    },
    {
        id: 22,
        question_en: "Is the website available in multiple languages?",
        answer_en: "Yes, the platform is available in Kazakh, Russian, and English.",
        question_kk: "Веб-сайт көп тілді бола ма?",
        answer_kk: "Иә, платформа қазақ, орыс және ағылшын тілдерінде қолжетімді.",
    },
    {
        id: 23,
        question_en: "What if funds are misused?",
        answer_en:
            "Project owners must provide detailed financial reports. If reports are not submitted, they may lose the right to post future projects.",
        question_kk: "Егер біреу ақшаны дұрыс пайдаланбаса, не болады?",
        answer_kk:
            "Жоба авторлары қаржының қалай жұмсалғаны туралы есеп беруі тиіс. Егер есеп берілмесе, болашақтағы жоба жариялау құқығы шектеледі.",
    },
    {
        id: 24,
        question_en: "What if a donor wants a refund?",
        answer_en:
            "Donors can request a refund according to project terms (for example, within a specific time period).",
        question_kk: "Егер біреу ақшаны қайтарғысы келсе, не істеуге болады?",
        answer_kk:
            "Донор өз қаражатын қайтаруды талап ете алады, бірақ бұл жоба шарттарына байланысты (мысалы, белгілі бір уақыт ішінде).",
    },
    {
        id: 25,
        question_en: "How is personal data protected?",
        answer_en:
            "All data is encrypted and user information is never shared with third parties.",
        question_kk: "Платформада пайдаланушылардың жеке деректері қалай қорғалады?",
        answer_kk:
            "Барлық деректер шифрлау арқылы сақталады, пайдаланушы ақпараттары үшінші тұлғаларға берілмейді.",
    },
    {
        id: 26,
        question_en: "How do you protect against cyber attacks?",
        answer_en:
            "We adhere to modern cybersecurity standards, using HTTPS, database protection, and two-factor authentication.",
        question_kk: "Хакерлік шабуылдардан қалай қорғанасыздар?",
        answer_kk:
            "Заманауи киберқауіпсіздік стандарттарын сақтау арқылы, HTTPS, деректер базасын қорғау және екі факторлы аутентификация қолданылады.",
    },
];

export default function About() {
    const { language } = useContext(LanguageContext);
    const [openFaqs, setOpenFaqs] = useState({});

    gsap.registerPlugin(useGSAP, ScrollTrigger);

    useGSAP(() => {
        gsap.utils.toArray(".fade-in-on-scroll").forEach((el) => {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out",
          });
        });
      }, []);

    const toggleFaq = (id) => {
        setOpenFaqs((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="flex flex-col">
            {/* Banner Image Section */}
            <section className="w-full h-72 md:h-96 relative overflow-hidden fade-in-on-scroll">
                <img
                    src="https://gov-web.s3.ap-northeast-1.amazonaws.com/uploads/2018/07/40454841765_49277f9ab4_o.jpg"
                    alt="Rural Education Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white">
                        {language === "en" ? "About Us" : "Біз туралы"}
                    </h1>
                </div>
            </section>

            {/* Mission & Social Impact Section */}
            <section className="py-16 bg-white fade-in-on-scroll">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="md:text-4xl text-3xl font-bold text-gray-800">
                        {language === "en"
                            ? "Our Mission 🎯"
                            : "Біздің мақсатымыз 🎯"}
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        {language === "en"
                            ? "Qazaq Endowment is an innovative online platform dedicated to providing real and fair support to rural educational institutions. Our mission is to bridge the gap between the city and countryside, ensuring equal access to quality education."
                            : "Qazaq Endowment - ауылдық білім беру мекемелеріне нақты әрі әділетті қолдау көрсететін онлайн платформа. Біздің мақсат - қала мен ауыл арасындағы білім беру сапасындағы алшақтықты қысқарту, балаларға сапалы білім алуға тең мүмкіндік жасау."}
                    </p>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 bg-gray-50 fade-in-on-scroll">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="md:text-4xl text-3xl font-bold text-gray-800 text-center mb-8">
                        {language === "en" ? "Gallery 🖼️" : "Фото галерея 🖼️"}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <img
                            src="https://egemen.kz/media/2019/04/26/6-1.jpg"
                            alt="School in session"
                            className="w-full h-56 object-cover rounded-lg shadow-md"
                        />
                        <img
                            src="https://www.caravan.kz/wp-content/uploads/images/572094.jpg"
                            alt="Rural landscape"
                            className="w-full h-56 object-cover rounded-lg shadow-md"
                        />
                        <img
                            src="https://sputnik.kz/img/07e5/0c/08/18861078_0:160:3073:1889_1920x0_80_0_0_c4dc828a0ed6cc443b8496c1ca9486fa.jpg"
                            alt="Classroom"
                            className="w-full h-56 object-cover rounded-lg shadow-md"
                        />
                        <img
                            src="https://i.ytimg.com/vi/UkKIfAk3iXQ/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgVChDMA8=&rs=AOn4CLBG6zfqU0ArgDHsQDR16Bit9JIxdg"
                            alt="Children learning"
                            className="w-full h-56 object-cover rounded-lg shadow-md"
                        />
                        <img
                            src="https://baq.kz/storage/cache_resize/news/2021/11/03/4gFuQ0gsFIOzMAmnUkAAkd60V58Nkysw8XhBprgc.jpg_width=1200Xheight=autoXtype=1.jpg"
                            alt="Teacher with students"
                            className="w-full h-56 object-cover rounded-lg shadow-md"
                        />
                        <img
                            src="https://altynsarin-gymnasium.edu.kz/uploads/posts/2022-12/1669977344_k2.png"
                            alt="Community and school"
                            className="w-full h-56 object-cover rounded-lg shadow-md"
                        />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-100 fade-in-on-scroll">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="md:text-4xl text-3xl font-bold text-gray-800 text-center mb-8">
                        {language === "en"
                            ? "Frequently Asked Questions"
                            : "Жиі қойылатын сұрақтар"}
                    </h2>
                    <div className="space-y-4">
                        {faqData.map((faq) => (
                            <div
                                key={faq.id}
                                className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
                                onClick={() => toggleFaq(faq.id)}
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {language === "en" ? faq.question_en : faq.question_kk}
                                    </h3>
                                    <span className="text-indigo-600 text-2xl">
                                        {openFaqs[faq.id] ? "-" : "+"}
                                    </span>
                                </div>
                                {openFaqs[faq.id] && (
                                    <p className="mt-2 text-gray-600">
                                        {language === "en" ? faq.answer_en : faq.answer_kk}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call To Action Section */}
            <section className="py-16 bg-indigo-600 fade-in-on-scroll">
                <div className="max-w-4xl mx-auto text-center px-4">
                    {language === "en" ? (
                        <>
                            <h2 className="text-4xl font-bold text-white">
                                Ready to Get Involved?
                            </h2>
                            <p className="mt-4 text-lg text-indigo-200">
                                Join us and become a beacon of change in rural education.
                            </p>
                            <Link href="/register">
                                <button className="mt-6 bg-white text-indigo-600 font-semibold py-2 px-8 rounded-full transition transform hover:scale-105">
                                    Get Involved
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <h2 className="md:text-4xl text-3xl font-bold text-white">
                                Қатысуға дайынсыз ба?
                            </h2>
                            <p className="mt-4 text-lg text-indigo-200">
                                Бізге қосылып, ауылдық білім беруді жақсартуға атсалысыңыз.
                            </p>
                            <Link href="/register">
                                <button className="mt-6 bg-white text-indigo-600 font-semibold py-2 px-8 rounded-full transition transform hover:scale-105">
                                    Қатысыңыз
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}
