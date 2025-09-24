type MenItem = { image: string; prompt: string }

const placeholders = ["/Mens/Cafe.png", "/Mens/glasses.png", "/Mens/spotlights.png","/Mens/star.png","/Mens/cars.png","/Mens/handsome.png","/Mens/doodle.png","/Mens/lighting.png","/Mens/lift.png","/Mens/suit.png","/Mens/smoke.png","/Mens/dectective.png","/Mens/newspaper.png","/Mens/travel.png","/Mens/rose.png","/Mens/redcar.png","/Mens/scene.png","/Mens/defender.png","/Mens/honda.png","/Mens/neon.png","/Mens/white.png","/Mens/black.png","/Mens/retro.png","/Mens/pro.png","/Mens/black.png","/Mens/lambo.png","/Mens/cadilac.png","/Mens/super.png","/Mens/studio.png","/Mens/smoke.png","/Mens/smokesrgb.png","/Mens/spot.png","/Mens/whitecoat.png","/Mens/fast.png"]

export const MEN_PROMPTS: MenItem[] = [
  {
    image: placeholders[0],
    prompt:
      "A realistic cinematic photo of the uploaded person sitting at a stylish outdoor café near the beach, palm trees in the background, reflections on large glass windows, relaxed modern vibe. The person is wearing casual stylish clothes (dark sweater or t-shirt, jeans, sunglasses), sitting comfortably on a chair holding a refreshing drink with mint and ice. Natural daylight, aesthetic cine tones, high quality, professional lifestyle photography, beach café ambiance. Use the face from the uploaded reference image and preserve the same facial features — do not alter the face.",
  },
  {
    image: placeholders[1],
    prompt:
      "A stylish young man, looking thoughtful, with warm, dramatic lighting creating strong shadows on a textured background. He wearing a slightly unbuttoned collared shirt and tailored trousers, with a single red rose tucked into",
  },
  {
    image: placeholders[2],
    prompt:
      "Prompt: moody studio portrait of the upload person, bethed in golden-orange spotlight that create glowing circular halo behind Thema on the wall. The warm light should sculpt the face and upper body with soft, sunset-like tones, while casting s strong head shadow to the right. Style the person. Her eye are closed and chin tilted slightly up",
  },
  {
    image: placeholders[3],
    prompt:
      "A cinematic low-light portrait of a South Asian man lounging on a couch, wearing an open button silk shirt, layered necklace. He holds a cigar in one hand and a crystal glass of whiskey in the other. Warm golden light highlights the smoke around him, while the background stays dark and moody. Expression, exuding power and calm authority. Ultra photorealistic, cinematic shadows, 8K quality.",
  },
  {
    image: placeholders[4],
    prompt:
      "With the person in image, casually leaning against a modified red supra mk4, on a quiet urban street at night. The street is wet and reflective, illuminated by neon and street lights, giving a moody, cinematic vibe. He wears a dark button-up shirt, loose blue jeans, and black Vans sneakers. The car's headlights glow. Shot from above with a dramatic angle, capturing both the car's detail and the reflective road. Inspired by Fast & Furious 2. Size 3:4. Use the face from the uploaded reference image and preserve the same facial features — do not alter the face.",
  },
  {
    image: placeholders[5],
    prompt:
      "Without changing my face or hairstyle, create an analog-style grunge photo from the year 2025. The background is in Tokyo, Japan with a supercar. I'm in the car seat, posing like a Korean model, with an aerial view of the car's interior, looking forward. I'm wearing an oversized black hoodie, baggy black jeans with ripped knees, and Nike Air Jordan low shoes. My body is shown from inside the car. The body proportion is 3/4 of the picture.",
  },
  {
    image: placeholders[6],
    prompt:
      "Apply bold hand-drawn doodles and motivational words directly on the uploaded photo. Use colors and accents that match and balance with the tones already in the photo for a seamless look. Replace the words with: Make the doodles dynamic with handwritten typography, arrows, lightning bolts, swirls, and abstract strokes, integrated into the composition so they enhance the subject without overpowering it. The style should keep the same energetic and modern vibe as the reference",
  },
  {
    image: placeholders[7],
    prompt:
      "A cinematic studio portrait of a man (attached photo) wearing a black turtleneck. The lighting is dramatic with a dual-tone setup: warm orange rim light from behind on one side of the hair and shoulder, and cool teal-blue fill light illuminating part of the face. The background is deep black, creating strong contrast and emphasizing the contours of the face. The mood is serious, professional, and artistic, with a refined, minimalist aesthetic.Ultra-realistic detail, sharp focus, high dynamic range, and cinematic atmosphere. Negative prompt: cartoon, anime, sketch, painting, 3D render, CGI, low resolution, blurry, distorted face, unnatural colors, watermark, text overlay, exaggerated features, bad anatomy, pixelated, overexposed, underexposed.",
  },
  {
    image: placeholders[8],
    prompt:
      '"Edit the photo to be standing casually in a modern style elevator with reflective metal walls. He is wearing an all black outfit: a black suit and trousers, wearing sunglasses and holding a cup of take-away coffee. Elegant and edgy style with a mysterious feel. The dim lighting from the neon lights on the ceiling creates subtle shadows."',
  },
  {
    image: placeholders[9],
    prompt:
      "A cinematic indoor scene of a young man standing in front of a large conspiracy investigation board filled with pinned documents, maps, sticky notes, photographs, book pages, and red strings connecting them. Overhead spotlights illuminate the board, creating dramatic shadows. Sticky notes include handwritten words like ‘COVID 19,’ ‘Vaccine Research,’ ‘1437,’ and ‘Human Destruction.’ A visible printed page from the book ‘Everything is F*cked’ by Mark Manson is on the board. The man has curly dark hair, a trimmed beard, and a serious expression. He wears a black blazer over a partially unbuttoned white shirt and is adjusting his collar with both hands. A black wristwatch is on his left wrist. The mood is dark, mysterious, and investigative, with cinematic lighting and a detective-style conspiracy wall behind him",
  },
  {
    image: placeholders[10],
    prompt:
      "A realistic photo of a young man sitting on a chair in a dark moody room, smoking a cigarette. The smoke rises into the air and forms the shape of a girl’s face, appearing like a memory or ghostly vision. The young man’s real face is unchanged and clearly visible, very sharp and detailed. The atmosphere is emotional, cinematic, and dramatic, with soft shadows and realistic lighting, giving a nostalgic and melancholic feeling. Ultra-realistic, photo-quality.",
  },
  {
    image: placeholders[11],
    prompt:
      "Cinematic editorial photograph of person holding up a burning newspaper, flames curling dramatically around paper edges. Newspaper headline reads bold text with modern typography, editorial style layout, featuring black and white images and quotes. Subject is dressed in sharp black suit. Dark background enhances fires glow, creating contrast with warm highlights on subjects clothing. Use the reference image for the face to maintain likeness. Ultra-detailed, high-contrast lighting, IMG_2034.CR2",
  },
  {
    image: placeholders[12],
    prompt:
      "i a raw cinematic candid street A photograph of a young Southeast Asian handsome man with a thin beard, 3 Herringbone 3-Piece Suit. He is standing, leaning his back casually against the chaotic poster wall, My expression is confident and neutral, and Behind him, the wall is fully plastered with overlapping vintage music posters, soft silhouette of an old wooden window casts warm golden hour light across the posters, creating creamy highlights and shadows. Beside him sits a lush pot o.",
  },
  {
    image: placeholders[13],
    prompt:
      "A stylish young man, facial will be 100% same as the reference image, with sharp features and dark tousled hair parted naturally. He is leaning casually against a vintage suitcase. He wears a textured brown blazer over an open-collar dark brown shirt, slightly unbuttoned at the top, paired with high-waisted light beige pleated trousers and a dark belt. The aesthetic is elegant and retro-inspired, with earthy tones. Minimalistic indoor background, cinematic warm natural lighting. Use the face from the uploaded reference image and preserve the same facial features — do not alter the face.",
  },
  {
    image: placeholders[14],
    prompt:
      "A full-body, side-angle portrait of a handsome 25-year-old boy me(use my image for refrence with accurate face), approximately 5-5 tall. He is sitting on the ground in a stylish pose against a solid deep wine-colored wall, he is looking from left to right ahead with deep shadows creating a 90S movie and romantic, windy environment. He is wearing a perfect red wine-colored, retro aesthetic shirt with matching pants and white sneakers. He has a silver watch and is holding a single rose flower.",
  },
  {
    image: placeholders[15],
    prompt:
      "A man sitting in a convertible car, looking away from the camera, wearing a blue shirt and white jeans, with a beard and a mustache.",
  },
  {
    image: placeholders[16],
    prompt:
      "Ultra-realistic cinematic photo using the exact same face from the uploaded reference image (keep 100% identical facial features and hairstyle). A stylish young man with curly hair and a trimmed beard, wearing a fitted black t-shirt, ripped black jeans, and black boots. He is leaning casually against a sleek black vintage muscle car parked on a winding mountain road. The background shows dramatic mountain silhouettes under a warm golden sunset sky. The mood is cinematic, moody, and atmospheric with soft golden-hour lighting. 4K, high detail.",
  },
  {
    image: placeholders[17],
    prompt:
      "Hyper-realistic low-angle full-body shot of a young man (Take uploaded image as the reference for face) leaning against a Land Rover Defender in a dim basement garage. Wearing oversized Nike wind cheater, baggy basketball pants. Adidas chunky sneakers, basketball cap. Hands crossed, attitude gaze. Luxury SUVs softly blurred with cinematic bokeh, shallow depth of field, strong subject separation, and 8K cinematic color grading.",
  },
  {
    image: placeholders[18],
    prompt:
      "A stylish young man posing confidently at a Shell gas station at night, leaning on a modified black Honda sports car with scissor doors open upwards. The car has a sleek, glossy finish with custom wheels and a lowered body. The man is wearing casual streetwear - black t-shirt, black jacket, dark jeans, and white Adidas sneakers. Bright gas station lights reflect on the car's surface, creating a cinematic, urban night scene",
  },
  {
    image: placeholders[19],
    prompt:
      "A young man in a dark hoodie, dark pants,  The scene has a cool, desaturated blue-gray color tone with deep shadows, starkly contrasted by the light trails.",
  },
  {
    image: placeholders[20],
    prompt:
      "Ultra-realistic cinematic portrait of the uploaded person with identical face and styled hair, standing gracefully in a tailored white suit against a dark minimalist background, bathed in golden sunlight with chiaroscuro shadows, one hand in pocket, the other lifting deep red roses near his face, gazing romantically into the camera as voluminous hair glows and a strong shadow silhouette adds poetic editorial depth.",
  },
  {
    image: placeholders[21],
    prompt:
      "A cinematic black-and-white portrait of a stylish young man holding a single red rose, with the rose as the only element in vibrant color. He has sharp facial features, voluminous styled black hair, and a chiseled jawline. His head is tilted slightly upward as he gently smells the rose",
  },
  {
    image: placeholders[22],
    prompt:
      "Create a grainy retro vintage of a young man standing front of wall with wearing loose white wool T-shirt and pant,luxury formal watch,hair like 90’s movie baddie.plucking flowers from a flowering vine by one hand another hand at head looked in cemera. face 100% match from uploaded image, windy environment hd sharpen resolution with sunlight and soft shadows.",
  },
  {
    image: placeholders[23],
    prompt:
      "Create a retro, vintage-inspired image - grainy yet bright - based on the reference picture. The boy should be wearing a white shirt with small brown flower prints, paired with plated beige pants styled in a Pinterest-inspired aesthetic. The vibe must capture the essence of a 90s movie dark-brown-haired baddie, hair waving by a windy, romantic atmosphere. He is sitting on a wooden bench as a few leaves blow in the air, while dramatic contrasts add mystery and artistry to the scene, creating a moody yet enchanting. Use the face from the uploaded reference image and preserve the same facial features — do not alter the face.",
  },
  {
    image: placeholders[25],
    prompt:
      "Cinematic candid morning street photography, side shot, featuring a man with the same face as the reference photo, Outfit: Blue shirt, white cargo pants. The man is walking casually near a parked Blue Lamborghini front of an Indonesian aesthetic coffee shop, shop name, CAFE while holding a cup of coffee. His face shows a candid editorial expression seeing camera. At the top of the frame, there is a lush white frangipani tree with dense leaves and many small white flowers.Ultra-realistic 8K.",
  },
  {
    image: placeholders[26],
    prompt:
      "Create a vintage 1970s Bollywood-inspired photograph of a stylish men sitting casually on the hood of a classic car. he is dressed in a cream pinstriped blazer, cream bell-bottom trousers, & a dark brown shirt with the top buttons open, paired with brown formal shoes, giving a confident mafia-style look. The car has wide whitewall tires, chrome details, & a polished metallic body, reflecting sunlight. in the background, tall green trees and hedges frame the scene. The photograph has the warm keep the face preserve 100% same as the uploaded image.",
  },
  {
    image: placeholders[27],
    prompt:
      "green shirt, white cargo pants. The man is walking casually near a parked white Lamborghini front of an Indonesian aesthetic coffee shop, shop name, CAFE while holding a cup of coffee. His face shows a candid editorial expression seeing camera. At the top of the frame, there is a lush white frangipani tree with dense leaves and many small white flowers. Ultra-realistic 8K.",
  },
  {
    image: placeholders[28],
    prompt:
      "A cinematic 4K studio portrait. He sits casually on a stool in a professional photography studio, surrounded by softbox and spotlight equipment. He wears modern casual clothing, in a relaxed and confident pose, with one hand touching his face and the other resting on his leg. The background is minimalistic grey, enhanced by dramatic studio lighting that creates soft shadows and a stylish atmosphere. Ultra-detailed portrait, 4K resolution, professional editorial photography style.",
  },
  {
    image: placeholders[30],
    prompt:
      "Take the face from the uploaded reference photo exactly 100% the same (do not alter his facial features, keep his identity intact). Create a cool young man with wavy, vintage-style hair, clean-cut look, wearing a white t-shirt and light-colored jeans. He is sitting comfortably on a wooden crate, looking to the right while holding a denim jacket. The background features a smoky blue-and-red effect blended into a bright black studio scene, creating a dramatic and stylish atmosphere.",
  },
  {
    image: placeholders[33],
    prompt:
      "A hyper-realistic, ultra-sharp cinematic portrait of a stylish man leaning casually against a sleek black Maserati MC20 supercar. The man stands in a relaxed pose with one leg slightly bent, resting his back against the glossy car door while bringing his right fist lightly to his face in a thoughtful gesture. He wears a fitted black leather jacket, tailored black pants, and dark sneakers with crisp white soles. His confident expression is composed and slightly ",
  },
  {
    image: placeholders[31],
    prompt:
      "Moody cinematic interior of a man sitting in a vintage cinema. Red velvet seats behind him fade into darkness. Projector beam cuts haze, lighting half his face. Calm yet commanding posture.",
  },
  {
    image: placeholders[32],
    prompt:
      "Hyper-realistic editorial portrait of the uploaded person, captured from a slightly closer angle (framed from head to knees). He is wearing a fitted white suit with a silk shirt standing confidently under dramatic spotlight. One hand casually rests in his pocket while the other hangs relaxed. A subtle haze of drifting smoke surrounds him, adding cinematic depth Confident yet stylish expression, sleek fashion-magazine aesthetic, polished lighting, high end editorial photography style. ",
  },
]
