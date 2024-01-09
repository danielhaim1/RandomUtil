(()=>{var e={497:(e,t,n)=>{var i,r;e=n.nmd(e),i=[n(810),n(352)],r=function(t,n){"use strict";function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}var r={RandomContentUtil:t.RandomContentUtil,RandomUtil:n.RandomUtil};"object"===i(e)&&e.exports&&(e.exports=r),"object"===("undefined"==typeof window?"undefined":i(window))&&Object.assign(window,r)}.apply(t,i),void 0===r||(e.exports=r)},352:(e,t,n)=>{var i,r;i=[t,n(244),n(905)],void 0===(r=function(e,n,i){"use strict";function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,a(i.key),i)}}function a(e){var t=function(e,t){if("object"!=r(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,t||"default");if("object"!=r(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==r(t)?t:String(t)}Object.defineProperty(e,"__esModule",{value:!0}),t.RandomUtil=void 0;t.RandomUtil=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.initializeElements(t),this.dateManager=new n.RandomDateUtil(this),this.imageManager=new i.RandomImageUtil(this)}var t,r,a;return t=e,r=[{key:"initializeElements",value:function(e){var t=e.topics,n=e.titles,i=e.time,r=e.excerpts,o=e.date;this.topicElements=this.getElements(t),this.titleElements=this.getElements(n),this.readTimeEls=this.getElements(i),this.excerptElements=this.getElements(r),this.dateElements=this.getElements(o)}},{key:"getElements",value:function(e){return e?document.querySelectorAll(e):[]}},{key:"updateElements",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(e){return e};e?e.forEach((function(e,i){e.textContent=n(t[i%t.length])})):console.log("No elements found")}},{key:"randomTopic",value:function(e){this.topicElements&&0!==this.topicElements.length?this.updateElements(this.topicElements,e):console.warn("No topic elements found.")}},{key:"randomTitle",value:function(e){this.titleElements&&0!==this.titleElements.length?this.updateElements(this.titleElements,e):console.warn("No title elements found.")}},{key:"randomReadTime",value:function(){this.updateElements(this.readTimeEls,Array(this.readTimeEls.length).fill(),(function(){return"".concat(Math.floor(11*Math.random())+2," min read")}))}},{key:"randomExcerpt",value:function(e){this.updateElements(this.excerptElements,e)}},{key:"randomDate",value:function(e){this.dateElements&&0!==this.dateElements.length?this.dateManager.randomDate(e):console.warn("No date elements found.")}},{key:"randomImages",value:function(e){var t=e.count,n=void 0===t?12:t,r=e.query,o=void 0===r?"nature":r,a=e.orientation,s=void 0===a?"landscape":a;new i.RandomImageUtil(n,o,s).init()}}],r&&o(t.prototype,r),a&&o(t,a),Object.defineProperty(t,"prototype",{writable:!1}),e}()}.apply(t,i))||(e.exports=r)},810:(e,t)=>{var n;void 0===(n=function(e){"use strict";function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,r(i.key),i)}}function r(e){var t=function(e,t){if("object"!=n(e)||!e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var r=i.call(e,t||"default");if("object"!=n(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==n(t)?t:String(t)}Object.defineProperty(e,"__esModule",{value:!0}),t.RandomContentUtil=void 0;t.RandomContentUtil=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.category=t,this.randomExcerpts=[],this.randomTopics=[],this.randomTitles=[],this.dataByCategory={1:{titles:["Preserving Wildlife: Our Mission","Join Us in Protecting Nature","Wildlife Conservation Efforts","Saving Endangered Species","Empowering Wildlife Guardians","Supporting Wildlife Rehabilitation","Safeguarding Animal Habitats","Championing Wildlife Education","A Future Where Wildlife Thrives","Together for Wildlife Preservation","Creating a Safe Haven for Animals","Sustainable Wildlife Solutions","Unite for Wildlife Conservation","Caring for Our Animal Friends","Advocating for Wildlife Rights","Building a Better World for Wildlife","Education for Wildlife Awareness","Our Commitment to Wildlife Protection","Protecting the Wild Ones","Rescue, Rehabilitate, Release: Our Pledge","Wildlife in Crisis: Our Response","Conservation Heroes in Action","Hope for Endangered Wildlife","Connecting People with Nature","Join the Fight for Wildlife Survival","A Home for Every Species","Empowering Communities for Wildlife","Preserving Biodiversity Together","Wildlife: Our Shared Responsibility","For a Future Where All Species Thrive","Wildlife Preservation: Our Legacy","From Crisis to Conservation: Our Journey","Innovations for Wildlife Protection","Empathy, Education, and Wildlife Care","A Voice for the Voiceless Creatures","Sustaining Life on Earth: Our Calling","Protecting the Web of Life","Inspiring Love and Respect for Wildlife","Join Us in the Wildlife Crusade","Nature's Guardians: Our Role"],excerpts:["Our mission is to preserve and protect wildlife for future generations.","Join us in the noble cause of protecting and conserving nature's treasures.","Discover our dedicated efforts in wildlife conservation and habitat preservation.","We're committed to saving endangered species from the brink of extinction.","Empower wildlife guardians to defend and nurture our planet's precious creatures.","Support wildlife rehabilitation programs to give injured animals a second chance at life.","Safeguard animal habitats to ensure they thrive in their natural environments.","Champion wildlife education to foster a deeper connection between people and nature.","We envision a future where wildlife flourishes in harmony with our world.","Join us in our mission to come together for the preservation of wildlife.","Help us create safe havens for animals to live, thrive, and roam freely.","Discover sustainable solutions that protect and sustain our planet's wildlife.","Unite with us in the fight for the conservation of precious wildlife species.","Our commitment extends to caring for and protecting our animal friends.","Advocate for the rights and welfare of wildlife worldwide.","We're building a better world where wildlife can thrive and coexist with humans.","Education is key to raising awareness about the importance of wildlife in our lives.","Explore our unwavering commitment to protecting and preserving wildlife.","Join us in our mission to protect the wild ones who share our planet.","Our pledge is to rescue, rehabilitate, and release animals in need.","Learn about our response to wildlife in crisis and how you can make a difference.","Discover the conservation heroes who are actively working to protect our planet's wildlife.","We offer hope for endangered wildlife by supporting conservation initiatives.","Our goal is to connect people of all ages with the wonders of the natural world.","Join the fight to ensure the survival of wildlife species for generations to come.","We believe every species deserves a safe and nurturing home in the wild.","Empower communities to become champions for wildlife preservation.","Together, we can preserve biodiversity and protect our planet's wildlife.","Wildlife conservation is a shared responsibility we all must embrace.","Join us in our mission for a future where all species thrive on Earth.","Our legacy is built upon a commitment to preserving and protecting wildlife.","Explore our journey from crisis to conservation as we strive to save species.","Discover innovative solutions that safeguard wildlife and their natural habitats.","We promote empathy, education, and compassionate care for all creatures.","Be a voice for the voiceless creatures who depend on our stewardship.","Our calling is to sustain life on Earth by protecting and preserving wildlife.","Protecting the web of life is essential for the survival of our planet.","We inspire love and respect for wildlife in the hearts of people worldwide.","Join us in the wildlife crusade to protect and conserve our natural world.","Discover our role as nature's guardians and advocates for wildlife preservation."],topics:["Wildlife Preservation","Conservation","Habitat Protection","Endangered Species","Animal Rehabilitation","Habitat Safeguard","Wildlife Education","Future for Wildlife","Community Empowerment","Biodiversity","Shared Responsibility","Safe Havens","Sustainable Solutions","Unification for Wildlife","Animal Care","Advocacy","Better World","Education for Awareness","Commitment to Protection","Protecting the Wild","Rescue and Release","Response to Crisis","Conservation Heroes","Hope for Wildlife","Nature Connection","Fight for Survival","Safe Homes","Empowering Communities","Preserving Biodiversity","Global Responsibility","Thriving Species","Legacy of Preservation","From Crisis to Conservation","Innovations for Protection","Empathy and Education","Voice for Wildlife","Sustaining Life","Web of Life","Love for Wildlife","Wildlife Crusade","Guardianship of Nature"]},2:{titles:["Exploring Hidden Wonders Worldwide","Wildlife Safari Adventures in Africa","Unraveling the Climate Change Challenge","Deep Ocean Mysteries Revealed","Journey Through Millennia of History","Nature's Breathtaking Beauty Unveiled","Surviving the Wilderness: Tales of Resilience","Epic Landscapes Across the Globe","Earth's Ever-Shifting Landscape","Rare Wildlife Encounters in the Wilderness","Into the Heart of the Amazon Rainforest","Unveiling Underwater Enigmas","Human History Unearthed","Preserving Earth's Fragile Ecosystems","Unlocking Ancient Ruins' Secrets","Up Close with Earth's Wild Creatures","Chasing the Enigmatic Aurora Borealis","Tales of Daring Global Expeditions","Oceans: A World of Wonders","Rediscovering Ancient Civilizations' Grandeur","Marvels of Nature: Secrets Exposed","African Safaris: Wildlife Adventures Await","The Urgent Battle Against Climate Change","Deep-Sea Discoveries and Ocean Wonders","A Historical Odyssey Through Time","Nature's Beauty: Awe-Inspiring Spectacles","Survival Stories: Facing the Wilderness","Scenic Marvels Across Continents","Our Changing Planet: Transformations Unveiled","Rare Wildlife: Extraordinary Encounters","Amazon Expedition: Journey to the Unknown","Beneath the Waves: Ocean Treasures","Archaeological Marvels: Ancient Secrets Revealed","Guardians of Ecosystems: Conservation Tales","Ancient Mysteries Unveiled: Ruins Explored","Wild Kingdom: Close Encounters with Wildlife","Chasing Northern Lights: Aurora Adventures","Explorer Chronicles: Adventures Beyond Boundaries","Marine Wonders: Dive into Ocean Diversity","Rediscovering Civilizations: Ancient Legacy Revived","The Beauty of the Natural World","Wildlife Safaris: African Adventures Await","Climate Crisis: The Urgent Call to Action","Beneath the Surface: Oceanic Marvels Revealed"],excerpts:["Discover breathtaking landscapes and hidden wonders in this thrilling journey.","Embark on a wildlife safari like never before and witness the circle of life.","Gain deep insights into the pressing issue of climate change and its consequences.","Dive into the mysteries of the ocean depths and encounter fascinating creatures.","Take a captivating journey through time and explore the history of our world.","Immerse yourself in the spectacular beauty of nature's most stunning locations.","Learn the art of survival in the wild as we share stories of resilience and courage.","Unveil epic landscapes from around the globe, each with its own unique charm.","Witness the ever-changing landscape of our planet and its stunning transformations.","Experience rare encounters with some of the world's most extraordinary animals.","Embark on an adventure into the heart of the Amazon jungle and uncover its secrets.","Dive into the depths of the ocean to unveil its hidden wonders and mysteries.","Uncover the secrets of human history through archaeological discoveries.","Explore the fragile ecosystems of our Earth and the efforts to protect them.","Journey to ancient ruins and unlock the mysteries of civilizations long past.","Get up close and personal with wild creatures in their natural habitats.","Chase the elusive Aurora Borealis and witness the magic of the northern lights.","Join daring expeditions to the most extreme and remote corners of the Earth.","Dive into the depths of our oceans and discover their fascinating biodiversity.","Rediscover the wonders of ancient civilizations and their enduring legacies."],topics:["Nature","Wildlife","Climate","Ocean","History","Survival","Landscape","Change","Adventure","Science","Exploration","Discovery","Conservation","Journey","Biodiversity","Ancient World","Eco-Warriors","Extreme Expeditions","Marine Life","Culture"]},3:{titles:["Innovations in Technology","Designing Future Solutions","Tech Trends: What's Next?","The Art of User Interface","Exploring Digital Design","Revolutionizing Tech Industry","Designing for User Experience","Coding: The Creative Craft","The Future of AI and Robotics","Sustainable Tech Solutions","Cybersecurity Challenges Ahead","Design Thinking in Action","The World of Virtual Reality","Advancements in Data Science","Tech Startups: Success Stories","Graphic Design Evolution","Gaming Technology Unleashed","Digital Marketing Strategies","IoT: Connecting Our World","Artificial Intelligence Insights","Designing for Accessibility","Space Exploration Technology","Future of Mobile Apps","Eco-Friendly Design Practices","The Blockchain Revolution","Smart Cities of Tomorrow","Web Development Trends","Augmented Reality Experiences","Data Privacy in the Digital Age","Emerging Tech in Healthcare","Product Design Innovations","Cryptocurrency & Finance","3D Printing: Shaping the Future","UX/UI Design Principles","AI in Healthcare: Transforming Lives","Digital Illustration Mastery","Cybersecurity in a Connected World","Designing Sustainable Cities","Tech Entrepreneurship Journey","The Future of Wearables","AR/VR Gaming Adventures","Cryptocurrency Revolution"],excerpts:["Explore the latest innovations in technology that are changing our world.","Designing for the future means creating solutions that stand the test of time.","Stay ahead with insights into the ever-evolving tech trends and developments.","User interface design is an art form that blends functionality and aesthetics.","Dive into the world of digital design and discover its endless possibilities.","Witness the revolution taking place in the technology and design industries.","Design with the user in mind to create exceptional experiences and products.","Coding is more than a skill; it's a creative craft that shapes the digital world.","The future is AI and robotics, and we're on the cusp of incredible advancements.","Explore sustainable tech solutions that are making a positive impact.","As technology advances, so do the challenges in keeping our data safe.","Design thinking is a powerful approach to problem-solving and innovation.","Step into a world of virtual reality and experience the future firsthand.","Data science is unlocking new possibilities and insights across industries.","Discover the stories of successful tech startups and their journeys to the top.","Graphic design continues to evolve, shaping the visual language of our world.","Gaming technology is pushing boundaries and providing immersive experiences.","Digital marketing strategies are essential in today's competitive landscape.","The Internet of Things is connecting and transforming our world in unprecedented ways.","Artificial intelligence is reshaping industries and driving innovation.","Design for accessibility to ensure technology is inclusive and user-friendly.","Technology plays a crucial role in the exploration and understanding of space.","The future of mobile apps is bright, with exciting developments on the horizon.","Embrace eco-friendly design practices that reduce our impact on the environment.","Blockchain technology is changing the way we transact and secure data.","Smart cities are the urban centers of tomorrow, leveraging tech for efficiency.","Stay updated on the latest web development trends and best practices.","Augmented reality offers new dimensions of interactive and immersive experiences.","Data privacy is a paramount concern in the digital age; stay informed.","Emerging tech is revolutionizing healthcare, improving patient outcomes.","Product design innovations are shaping the products we use and love.","Explore the intersection of cryptocurrency and the financial industry.","3D printing is unlocking creative possibilities and transforming manufacturing.","Master UX/UI design principles to create user-centric digital experiences.","AI is making a profound impact on healthcare, enhancing diagnosis and treatment.","Digital illustration is an art form that combines creativity with technology.","Navigate the complex world of cybersecurity in an increasingly connected world.","Design cities for sustainability, where technology enhances quality of life.","Embark on an entrepreneurial journey in the ever-evolving tech industry.","Wearables are changing the way we interact with technology and monitor health.","Experience the adventures of AR/VR gaming and explore virtual worlds.","Cryptocurrency is reshaping finance and challenging traditional systems."],topics:["Innovation","Design","Tech Trends","UI/UX","Digital Design","Tech Revolution","User Experience","Coding","AI & Robotics","Sustainability","Cybersecurity","Design Thinking","Virtual Reality","Data Science","Startups","Graphic Design","Gaming","Digital Marketing","IoT","Artificial Intelligence","Accessibility","Space Tech","Mobile Apps","Eco-Design","Blockchain","Smart Cities","Web Development","Augmented Reality","Data Privacy","Healthcare Tech","Product Design","Cryptocurrency","3D Printing","UX/UI Design","AI in Healthcare","Digital Illustration","Cybersecurity","Sustainable Cities","Tech Entrepreneurship","Wearable Tech","AR/VR Gaming","Cryptocurrency"]}},this.initializeData()}var t,n,r;return t=e,(n=[{key:"initializeData",value:function(){var e=this.dataByCategory[this.category];e?(this.randomTitles=e.titles,this.randomExcerpts=e.excerpts,this.randomTopics=e.topics):console.warn("Invalid category selected")}}])&&i(t.prototype,n),r&&i(t,r),Object.defineProperty(t,"prototype",{writable:!1}),e}()}.apply(t,[t]))||(e.exports=n)},244:(e,t)=>{var n;void 0===(n=function(e){"use strict";function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t,n){return(t=s(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,s(i.key),i)}}function s(e){var t=function(e,t){if("object"!=n(e)||!e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var r=i.call(e,t||"default");if("object"!=n(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==n(t)?t:String(t)}Object.defineProperty(e,"__esModule",{value:!0}),t.RandomDateUtil=void 0;t.RandomDateUtil=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.dateElements=t.dateElements,this.format="M j, Y"}var t,n,i;return t=e,(n=[{key:"setFormat",value:function(e){this.format=e}},{key:"getRandomDateInLastSixMonths",value:function(){var e=new Date,t=new Date(e.setMonth(e.getMonth()-6));return new Date(t.getTime()+Math.random()*(e.getTime()-t.getTime()))}},{key:"formatDate",value:function(e,t){var n=this,i=new Intl.DateTimeFormat("en-US",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1,weekday:"long"}).formatToParts(e).reduce((function(e,t){return r(r({},e),{},o({},t.type,t.value))}),{});return t.replace(/(d|j|S|l|D|m|n|F|M|Y|y|a|A|g|h|G|H|i|s|T|c|r|U)/g,(function(t){switch(t){case"d":return i.day;case"j":return parseInt(i.day,10);case"S":return n.getOrdinalSuffix(parseInt(i.day,10));case"l":return i.weekday;case"D":return i.weekday.substring(0,3);case"m":return i.month;case"n":return parseInt(i.month,10);case"F":return new Intl.DateTimeFormat("en-US",{month:"long"}).format(e);case"M":return new Intl.DateTimeFormat("en-US",{month:"short"}).format(e);case"Y":return i.year;case"y":return i.year.substring(2);case"a":return parseInt(i.hour,10)>=12?"pm":"am";case"A":return parseInt(i.hour,10)>=12?"PM":"AM";case"g":return parseInt(i.hour,10)%12||12;case"h":return("0"+(parseInt(i.hour,10)%12||12)).slice(-2);case"G":return parseInt(i.hour,10);case"H":return i.hour;case"i":return i.minute;case"s":return i.second;case"T":return/\((.*)\)/.exec((new Date).toString())[1];case"c":return e.toISOString();case"r":return e.toUTCString();case"U":return Math.floor(e.getTime()/1e3);default:return t}}))}},{key:"getOrdinalSuffix",value:function(e){if(e>3&&e<21)return"th";switch(e%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}}},{key:"randomDate",value:function(e){var t=this;this.dateElements&&this.dateElements.length>0&&this.dateElements.forEach((function(n){var i=t.getRandomDateInLastSixMonths(),r=t.formatDate(i,e);n.setAttribute("datetime",i.toISOString()),n.setAttribute("itemprop","datePublished"),n.textContent=r}))}}])&&a(t.prototype,n),i&&a(t,i),Object.defineProperty(t,"prototype",{writable:!1}),e}()}.apply(t,[t]))||(e.exports=n)},905:(e,t)=>{var n;void 0===(n=function(e){"use strict";function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function i(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */i=function(){return t};var e,t={},r=Object.prototype,o=r.hasOwnProperty,a=Object.defineProperty||function(e,t,n){e[t]=n.value},s="function"==typeof Symbol?Symbol:{},l=s.iterator||"@@iterator",c=s.asyncIterator||"@@asyncIterator",u=s.toStringTag||"@@toStringTag";function h(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{h({},"")}catch(e){h=function(e,t,n){return e[t]=n}}function d(e,t,n,i){var r=t&&t.prototype instanceof b?t:b,o=Object.create(r.prototype),s=new I(i||[]);return a(o,"_invoke",{value:W(e,n,s)}),o}function f(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}t.wrap=d;var p="suspendedStart",g="suspendedYield",m="executing",v="completed",y={};function b(){}function w(){}function E(){}var S={};h(S,l,(function(){return this}));var x=Object.getPrototypeOf,C=x&&x(x(R([])));C&&C!==r&&o.call(C,l)&&(S=C);var T=E.prototype=b.prototype=Object.create(S);function A(e){["next","throw","return"].forEach((function(t){h(e,t,(function(e){return this._invoke(t,e)}))}))}function D(e,t){function i(r,a,s,l){var c=f(e[r],e,a);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"==n(h)&&o.call(h,"__await")?t.resolve(h.__await).then((function(e){i("next",e,s,l)}),(function(e){i("throw",e,s,l)})):t.resolve(h).then((function(e){u.value=e,s(u)}),(function(e){return i("throw",e,s,l)}))}l(c.arg)}var r;a(this,"_invoke",{value:function(e,n){function o(){return new t((function(t,r){i(e,n,t,r)}))}return r=r?r.then(o,o):o()}})}function W(t,n,i){var r=p;return function(o,a){if(r===m)throw new Error("Generator is already running");if(r===v){if("throw"===o)throw a;return{value:e,done:!0}}for(i.method=o,i.arg=a;;){var s=i.delegate;if(s){var l=k(s,i);if(l){if(l===y)continue;return l}}if("next"===i.method)i.sent=i._sent=i.arg;else if("throw"===i.method){if(r===p)throw r=v,i.arg;i.dispatchException(i.arg)}else"return"===i.method&&i.abrupt("return",i.arg);r=m;var c=f(t,n,i);if("normal"===c.type){if(r=i.done?v:g,c.arg===y)continue;return{value:c.arg,done:i.done}}"throw"===c.type&&(r=v,i.method="throw",i.arg=c.arg)}}}function k(t,n){var i=n.method,r=t.iterator[i];if(r===e)return n.delegate=null,"throw"===i&&t.iterator.return&&(n.method="return",n.arg=e,k(t,n),"throw"===n.method)||"return"!==i&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+i+"' method")),y;var o=f(r,t.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,y;var a=o.arg;return a?a.done?(n[t.resultName]=a.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,y):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,y)}function O(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function P(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function I(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(O,this),this.reset(!0)}function R(t){if(t||""===t){var i=t[l];if(i)return i.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,a=function n(){for(;++r<t.length;)if(o.call(t,r))return n.value=t[r],n.done=!1,n;return n.value=e,n.done=!0,n};return a.next=a}}throw new TypeError(n(t)+" is not iterable")}return w.prototype=E,a(T,"constructor",{value:E,configurable:!0}),a(E,"constructor",{value:w,configurable:!0}),w.displayName=h(E,u,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===w||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,E):(e.__proto__=E,h(e,u,"GeneratorFunction")),e.prototype=Object.create(T),e},t.awrap=function(e){return{__await:e}},A(D.prototype),h(D.prototype,c,(function(){return this})),t.AsyncIterator=D,t.async=function(e,n,i,r,o){void 0===o&&(o=Promise);var a=new D(d(e,n,i,r),o);return t.isGeneratorFunction(n)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},A(T),h(T,u,"Generator"),h(T,l,(function(){return this})),h(T,"toString",(function(){return"[object Generator]"})),t.keys=function(e){var t=Object(e),n=[];for(var i in t)n.push(i);return n.reverse(),function e(){for(;n.length;){var i=n.pop();if(i in t)return e.value=i,e.done=!1,e}return e.done=!0,e}},t.values=R,I.prototype={constructor:I,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(P),!t)for(var n in this)"t"===n.charAt(0)&&o.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function i(i,r){return s.type="throw",s.arg=t,n.next=i,r&&(n.method="next",n.arg=e),!!r}for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r],s=a.completion;if("root"===a.tryLoc)return i("end");if(a.tryLoc<=this.prev){var l=o.call(a,"catchLoc"),c=o.call(a,"finallyLoc");if(l&&c){if(this.prev<a.catchLoc)return i(a.catchLoc,!0);if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else if(l){if(this.prev<a.catchLoc)return i(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return i(a.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&o.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var r=i;break}}r&&("break"===e||"continue"===e)&&r.tryLoc<=t&&t<=r.finallyLoc&&(r=null);var a=r?r.completion:{};return a.type=e,a.arg=t,r?(this.method="next",this.next=r.finallyLoc,y):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),y},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),P(n),y}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var i=n.completion;if("throw"===i.type){var r=i.arg;P(n)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,i){return this.delegate={iterator:R(t),resultName:n,nextLoc:i},"next"===this.method&&(this.arg=e),y}},t}function r(e,t,n,i,r,o,a){try{var s=e[o](a),l=s.value}catch(e){return void n(e)}s.done?t(l):Promise.resolve(l).then(i,r)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(i,o){var a=e.apply(t,n);function s(e){r(a,i,o,s,l,"next",e)}function l(e){r(a,i,o,s,l,"throw",e)}s(void 0)}))}}function a(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,s(i.key),i)}}function s(e){var t=function(e,t){if("object"!=n(e)||!e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var r=i.call(e,t||"default");if("object"!=n(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==n(t)?t:String(t)}Object.defineProperty(e,"__esModule",{value:!0}),t.RandomImageUtil=void 0;t.RandomImageUtil=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:12,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"nature",i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"landscape";!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.count=t,this.orientation=i,this.query=n,this.accessKey="ek5QB3ngwDZ2j2fy4xWUa6hHKrra0-8HEt1Lp_Ibm2s",this.cacheTime=86400,this.cacheControlHeader="public, max-age=".concat(this.cacheTime),this.tooltip=!0}var t,n,r,s,l;return t=e,n=[{key:"apiUrl",get:function(){return"https://api.unsplash.com/photos/random/?client_id=".concat(this.accessKey,"&count=").concat(this.count,"&orientation=").concat(this.orientation,"&query=").concat(this.query)}},{key:"init",value:(l=o(i().mark((function e(){var t,n,r;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((t=document.querySelectorAll("[data-random='img']")).length){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,caches.open("disco-cache");case 5:return n=e.sent,e.next=8,n.match(this.apiUrl);case 8:(r=e.sent)?this.applyImagesFromCache(r,t):this.fetchAndApplyImages(n,t);case 10:case"end":return e.stop()}}),e,this)}))),function(){return l.apply(this,arguments)})},{key:"applyImagesFromCache",value:function(e,t){var n=this;e.json().then((function(e){return n.distributeImages(t,e)}))}},{key:"fetchAndApplyImages",value:(s=o(i().mark((function e(t,n){var r,o;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(this.apiUrl,{headers:{"Cache-Control":this.cacheControlHeader}});case 3:return r=e.sent,t.put(new Request(this.apiUrl),r.clone()),e.next=7,r.json();case 7:o=e.sent,this.distributeImages(n,o),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.error("Error fetching images:",e.t0);case 14:case"end":return e.stop()}}),e,this,[[0,11]])}))),function(e,t){return s.apply(this,arguments)})},{key:"distributeImages",value:function(e,t){var n=this;e.forEach((function(e,i){var r=t[i%t.length];n.updateImage(e,r)}))}},{key:"updateImage",value:function(e,t){var n=t.urls.regular,i=t.user.name,r=t.links.html;"IMG"===e.tagName?e.src=n:e.style.backgroundImage="url(".concat(n,")"),this.tooltip&&this.addTooltip(e,"Photo by ".concat(i," on Unsplash"),r)}},{key:"addTooltip",value:function(e,t,n){var i=document.createElement("span");i.classList.add("unsplash-credit-tooltip"),i.textContent=t,i.style.display="none",i.onclick=function(){return window.open(n,"_blank")},e.appendChild(i),e.onmouseover=function(){return setTimeout((function(){return i.style.display="block"}),1e3)},e.onmouseout=function(){return i.style.display="none"}}}],n&&a(t.prototype,n),r&&a(t,r),Object.defineProperty(t,"prototype",{writable:!1}),e}()}.apply(t,[t]))||(e.exports=n)}},t={};function n(i){var r=t[i];if(void 0!==r)return r.exports;var o=t[i]={id:i,loaded:!1,exports:{}};return e[i](o,o.exports,n),o.loaded=!0,o.exports}n.nmd=e=>(e.paths=[],e.children||(e.children=[]),e);n(497)})();