
// import removed – GameCard is already declared locally

export interface QuizOption {
  label: string;
  meaning: string;
  isCorrect?: boolean;
}

export interface ChallengeOption {
  label: "Dịu Dàng" | "Thú Vị" | "Nóng Bỏng";
  content: string;
}

export interface QuizCard {
  id: number;
  type: 'quiz';
  title: string;
  content: string;
  options: QuizOption[];
  isSpecial?: boolean;
}

export interface ChallengeCard {
  id: number;
  type: "challenge";
  title: string;
  content: string;
  options: ChallengeOption[];
}

export type GameCard = QuizCard | ChallengeCard;

export const cards: GameCard[] = [
  // ==========================================
  // 15 QUIZ CARDS (LONG DISTANCE / VIDEO CALL)
  // ==========================================
  {
    id: 1,
    type: "quiz",
    title: "Khao Khát Gặp Gỡ",
    content: "Ngay khoảnh khắc đầu tiên gặp lại nhau, em muốn làm gì nhất?",
    options: [
      {
        label: "🫂 Ôm chầm lấy anh và không buông",
        meaning:
          "🌹 Lá bài Chiếc Neo — Nỗi nhớ đã nén quá lâu. Cái ôm đầu tiên sẽ là nơi neo đậu bình yên nhất.",
      },
      {
        label: "💋 Hôn anh ngấu nghiến ngay tại chỗ",
        meaning:
          "🔮 Lá bài Ngọn Lửa — Đam mê bùng cháy. Không gì có thể ngăn cản sự khao khát này.",
      },
      {
        label: "😭 Chỉ cần nhìn nhau và khóc vì hạnh phúc",
        meaning:
          "🍷 Lá bài Nước Mắt — Cảm xúc vỡ òa. Khoảnh khắc ấy thời gian như ngừng lại.",
      },
      {
        label: "🏩 Kéo anh về phòng ngay lập tức",
        meaning:
          "✨ Lá bài Bí Mật — Sự riêng tư là thiên đường. Em muốn bù đắp cho tất cả những ngày xa cách.",
      },
    ],
  },
  {
    id: 2,
    type: "quiz",
    title: "Ngôn Ngữ Tình Yêu",
    content: "Em muốn được yêu thương theo cách nào nhất?",
    options: [
      {
        label: "📞 Được call video mỗi tối cho đến khi ngủ",
        meaning:
          "🌹 Lá bài Giấc Mơ — Giọng nói và gương mặt anh là liều thuốc an thần tốt nhất cho giấc ngủ của em.",
      },
      {
        label: '🗣️ Nghe anh nói những câu so cute như "快过来，让我亲一下"',
        meaning:
          "🔮 Lá bài Lời Thì Thầm — Ngôn từ ngọt ngào là mật ngọt cho tâm hồn. Sự nũng nịu làm tình yêu thêm màu sắc.",
      },
      {
        label: "🎁 Những món quà bất ngờ ship tận nơi",
        meaning:
          "🍷 Lá bài Hộp Bí Mật — Dù ở xa, sự quan tâm của anh vẫn hiện hữu. Em xứng đáng được yêu chiều.",
      },
      {
        label: '🔥 Những buổi "date online" hư hỏng',
        meaning:
          "✨ Lá bài Ngọn Nến — Khoảng cách không thể làm nguội lạnh đam mê. Chúng ta có cách yêu của riêng mình.",
      },
    ],
  },
  {
    id: 3,
    type: "quiz",
    title: "Món Quà Bí Mật",
    content:
      'Nếu anh gửi tặng em một món đồ "hư hỏng" từ xa, em muốn đó là gì?',
    options: [
      {
        label: "👙 Một bộ đồ lót thật sexy",
        meaning:
          "🌹 Lá bài Ren Đỏ — Em muốn mặc nó và chụp ảnh gửi riêng cho anh. Một bí mật chỉ hai ta biết.",
      },
      {
        label: "🧸 Một món đồ chơi người lớn",
        meaning:
          "🔮 Lá bài Chiếc Hộp — Khoảng cách địa lý không thể ngăn cản khoái cảm. Em sẵn sàng khám phá cùng anh.",
      },
      {
        label: "🎥 Một video quay riêng của anh",
        meaning:
          "🍷 Lá bài Cuộn Phim — Hình ảnh của anh là liều thuốc mạnh nhất. Em sẽ xem nó mỗi đêm.",
      },
      {
        label: "🧴 Mùi hương nước hoa của anh",
        meaning:
          "✨ Lá bài Hương Thơm — Mùi hương gợi nhớ ký ức. Em muốn cảm giác như anh đang ở ngay bên cạnh.",
      },
    ],
  },
  {
    id: 4,
    type: "quiz",
    title: "Giấc Mơ Ướt Át",
    content: 'Em đã từng mơ về "chuyện ấy" với anh chưa?',
    options: [
      {
        label: "🌚 Thường xuyên, mỗi đêm",
        meaning:
          "🌹 Lá bài Giấc Mộng — Khao khát của em là minh chứng cho tình yêu mãnh liệt. Đừng ngại ngùng vì điều đó.",
      },
      {
        label: "🤔 Thỉnh thoảng, khi nhớ anh quá",
        meaning:
          "🔮 Lá bài Ánh Trăng — Nỗi nhớ chuyển hóa thành khao khát. Đó là tiếng gọi của bản năng yêu thương.",
      },
      {
        label: "🤫 Em không dám kể đâu...",
        meaning:
          "🍷 Lá bài Mặt Nạ — Có những bí mật làm nên sự quyến rũ. Hãy thì thầm cho anh nghe khi mình gặp nhau.",
      },
      {
        label: "✋ Chưa, em chờ ngày gặp thật",
        meaning:
          "✨ Lá bài Sự Chờ Đợi — Em dành dụm tất cả năng lượng cho ngày tái ngộ. Đó sẽ là một đêm bùng nổ.",
      },
    ],
  },
  {
    id: 5,
    type: "quiz",
    title: "Siêu Năng Lực Tình Yêu",
    content: "Nếu có một siêu năng lực trong tình yêu, em chọn gì?",
    options: [
      {
        label: "🧠 Đọc được suy nghĩ của anh qua màn hình",
        meaning:
          "🌹 Lá bài Tâm Linh — Sự thấu hiểu tuyệt đối. Không cần lời nói, chỉ cần ánh mắt là hiểu lòng nhau.",
      },
      {
        label: "🚪 Dịch chuyển tức thời đến bên anh",
        meaning:
          "🔮 Lá bài Cỗ Máy Thời Gian — Xóa nhòa mọi khoảng cách. Chỉ cần nhớ là có thể bên nhau ngay lập tức.",
      },
      {
        label: "💞 Chạm vào anh qua điện thoại",
        meaning:
          "🍷 Lá bài Thần Dược — Một sự kết nối vật lý diệu kỳ. Anh mãi mãi thuộc về em.",
      },
      {
        label: "🦊 Biến hình thành con mèo của anh",
        meaning:
          "✨ Lá bài Chú Hề — Sự nũng nịu và quấn quýt. Em muốn được anh vuốt ve cả ngày.",
      },
    ],
  },
  {
    id: 6,
    type: "quiz",
    title: "Thử thách của chúng mình",
    content: "Theo em, điều khó nhất khi yêu xa là gì?",
    options: [
      {
        label: "🫦 Cảm giác rất muốn, nhưng ko cầm nắm được",
        meaning:
          "🌹 Lá bài Vino Rosso — Nỗi nhớ da diết như rượu vang ủ lâu năm. Sự khao khát làm tình yêu thêm mãnh liệt.",
      },
      {
        label: "🤗 Rất muốn ôm nhưng không có anh ở bên",
        meaning:
          "🔮 Lá bài Hoa Hồng — Khoảng cách thể xác không ngăn được sự kết nối tâm hồn. Cái ôm trong tâm tưởng vẫn ấm áp.",
      },
      {
        label: "🎡 Muốn đi chơi cùng Khim..",
        meaning:
          "🍷 Lá bài Bong Bóng — Những niềm vui giản đơn trở thành xa xỉ. Hãy cùng nhau mơ về ngày hội ngộ.",
      },
      {
        label: "💢 Chệnh nhịp và khó giải quyết khi cãi nhau",
        meaning:
          "✨ Lá bài Bếp Lửa Cổ — Thử thách tôi luyện sự kiên nhẫn. Vượt qua sóng gió, tình yêu sẽ càng bền vững.",
      },
    ],
  },
  {
    id: 7,
    type: "quiz",
    title: "Điều Anh Cần Làm Hơn",
    content: "Anh nên làm điều gì nhiều hơn cho em khi mình ở xa?",
    options: [
      {
        label: "👂 Video call và lắng nghe em nhiều hơn",
        meaning:
          "🌹 Lá bài Đôi Tai — Sự lắng nghe là món quà quý giá nhất. Anh sẽ luôn là nơi em trút bầu tâm sự.",
      },
      {
        label: "🎁 Gửi quà bất ngờ nhiều hơn",
        meaning:
          "🔮 Lá bài Ngôi Sao Băng — Cuộc sống cần những phép màu nhỏ bé. Anh sẽ mang đến cho em những niềm vui bất tận.",
      },
      {
        label: "💬 Nhắn tin ngọt ngào nhiều hơn",
        meaning:
          "🍷 Lá bài Cuốn Nhật Ký — Sự chân thành xóa tan khoảng cách. Anh sẽ học cách mở lòng mình hơn.",
      },
      {
        label: "🚀 Làm thêm nhìu điều đặc biệt như quiz hiện tại",
        meaning:
          "✨ Lá bài Bản Đồ Kho Báu — Sự chủ động dẫn lối cho đam mê. Anh sẽ là người thuyền trưởng vững tay chèo.",
      },
    ],
  },
  {
    id: 8,
    type: "quiz",
    title: "Nỗi Sợ Trong Tình Yêu",
    content: "Điều em sợ nhất trong một mối quan hệ là gì?",
    options: [
      {
        label: "😴 Sự mất lửa dần, nhàm chán",
        meaning:
          "🌹 Lá bài Phượng Hoàng — Tình yêu cần liên tục tái sinh. Lửa có thể yếu nhưng sẽ không bao giờ tắt.",
      },
      {
        label: "💔 Không được hiểu và thấu cảm",
        meaning:
          "🔮 Lá bài Tấm Gương — Ai cũng cần được nhìn thấy thật sự. Anh sẽ là tấm gương phản chiếu trái tim em.",
      },
      {
        label: "🌫️ Sự xa cách, thiếu kết nốii",
        meaning:
          "🍷 Lá bài Sợi Tơ — Khoảng cách thử thách nhưng không thể cắt đứt sợi tơ số phận.",
      },
      {
        label: "🎭 Mất đi bản thân trong tình yêu",
        meaning:
          "✨ Lá bài Đôi Cánh — Tình yêu đích thực cho em đôi cánh, không phải chiếc lồng. Hãy luôn là chính mình.",
      },
    ],
  },
  {
    id: 9,
    type: "quiz",
    title: "Lời Xin Lỗi",
    content:
      "Khi cãi nhau qua điện thoại, em thích được làm hoà bằng cách nào?",
    options: [
      {
        label: "📹 Call video ngay em nhận lỗi với em...",
        meaning:
          "🌹 Lá bài Bến Bình Yên — Nụ cười chữa lành mọi vết thương. Chỉ cần nhìn thấy nhau, mọi giận hờn đều tan biến.",
      },
      {
        label: "🗣️ Nói chuyện thẳng thắn, giải quyết gốc rễ",
        meaning:
          "🔮 Lá bài Thanh Kiếm — Sự trưởng thành trong tình yêu. Đối mặt để hiểu và thương nhau hơn.",
      },
      {
        label: "Viết một tin nhắn thật dài và chân thành",
        meaning:
          "🍷 Lá bài Bức Thư — Con chữ mang theo tâm tư. Sự kiên nhẫn và chân thành sẽ chạm đến trái tim.",
      },
      {
        label: "🥺 Muốn anh cụp cái pha và nhận saii",
        meaning:
          "✨ Lá bài Vương Miện — Sự nhường nhịn là đỉnh cao của sự yêu chiều. Anh thua cuộc để thắng được trái tim em.",
      },
    ],
  },

  {
    id: 10,
    type: "quiz",
    title: "Quyền Năng Tuyệt Đối",
    content:
      'Nếu bây giờ em có một chiếc điều khiển vạn năng để "ra lệnh" cho anh, em muốn anh làm gì nhất?',
    options: [
      {
        label: 'Ngoan ngoãn nghe lời: "Anh ơi, em muốn..."',
        meaning:
          "🃏 Lá bài The Hierophant (Niềm Tin) — Em chọn sự gắn kết và thấu hiểu. Anh nguyện làm người đồng hành trung thành nhất, luôn lắng nghe và chiều chuộng mọi mong muốn nhỏ nhất của em.",
      },
      {
        label: 'Chiếm hữu ngọt ngào: "Anh mua cho em Flower Knows!"',
        meaning:
          "❤️ Lá bài The Lovers (Tình Nhân) — Sự lựa chọn của trái tim. Trong mắt anh, thế giới này có 8 tỷ người nhưng tiêu điểm thì chỉ có một mình em duy nhất.",
      },
      {
        label: 'Phiêu lưu cùng nhau: "Cụ thể là phục vụ trên giường.."',
        meaning:
          "🗺️ Lá bài The Fool (Kẻ Khởi Đầu) — Em chọn sự tự do và trải nghiệm. Anh sẽ là người cầm lái, đưa em đi đến tận cùng thế giới, nơi chỉ có hai ta và những kỷ niệm mới.",
      },
      {
        label: 'Thống trị táo bạo: "Hôm nay anh phải nghe lệnh em hoàn toàn!"',
        meaning:
          '🔥 Lá bài The Emperor (Hoàng Đế) — Em chọn quyền lực và sự nồng cháy. Hôm nay "nóc nhà" là nhất, anh sẵn sàng phục tùng mọi hình phạt hay thử thách "táo bạo" nào mà em đưa ra.',
      },
      {
        label: 'Bình yên bên cạnh: "Chẳng cần làm gì, cứ ôm em thế này thôi"',
        meaning:
          "🌙 Lá bài The Star (Hy Vọng) — Em chọn sự bình yên thuần khiết. Giữa dòng đời tấp nập, anh sẽ là bến đỗ tĩnh lặng nhất để em tựa vào mỗi khi thấy mệt mỏi.",
      },
    ],
  },
  {
    id: 11,
    type: "quiz",
    title: "Kỷ Niệm Đẹp Nhất",
    content: "Kỷ niệm nào của hai đứa mình khiến em luôn nhớ?",
    options: [
      {
        label: "💖 Lần đầu hú hí cháo lưỡi",
        meaning:
          "🌹 Lá bài Khởi Nguồn — Mọi câu chuyện vĩ đại đều bắt đầu từ bước chân đầu tiên. Khoảnh khắc ấy là mãi mãi.",
      },
      {
        label: "🎁 Quà Valentine từ anh",
        meaning:
          "🔮 Lá bài Phiêu Lưu — Kỷ niệm đẹp nhất thường đến từ những chuyến đi bất ngờ nhất.",
      },
      {
        label: "🌃 Lần đầu call video đến sáng và học meet vs nhau",
        meaning:
          "🍷 Lá bài Ánh Sao — Khi hai tâm hồn tìm thấy nhau, thời gian ngừng trôi.",
      },
      {
        label: "Vì anh quá đáng iu, nhỏ flugger hehe",
        meaning:
          "✨ Lá bài Hộp Pandora — Bất ngờ đẹp nhất là bất ngờ từ trái tim.",
      },
    ],
  },
  {
    id: 12,
    type: "quiz",
    title: "Ký Ức Đầu Tiên",
    content: "Khoảnh khắc nào khiến em biết rằng anh là người đặc biệt?",
    options: [
      {
        label: "😳 Lần đầu anh rên=))",
        meaning:
          "🌹 Lá bài Ánh Trăng — Âm thanh chân thật nhất của cảm xúc. Đó là khi rào cản tan biến hoàn toàn.",
      },
      {
        label: "🌙 Cuộc trò chuyện đầu tiên kéo dài từ khuya đến sáng",
        meaning:
          "🔮 Lá bài Ngôi Sao — Hai linh hồn thức tỉnh cùng nhau. Đêm tối chứng kiến sự kết nối sâu sắc nhất.",
      },
      {
        label: "🍬 Khi anh quan tâm đến một điều nhỏ nhặt về em",
        meaning:
          "🍷 Lá bài Chiếc Cốc — Tình yêu ẩn trong những chi tiết nhỏ. Sự tinh tế làm nên điều vĩ đại.",
      },
      {
        label: "💘 Em không nhớ rõ, chỉ biết trái tim đã quyết <3",
        meaning:
          "✨ Lá bài Định Mệnh — Có những thứ vượt ngoài lý trí. Trái tim luôn có lý lẽ riêng của nó.",
      },
    ],
  },
  {
    id: 13,
    type: "quiz",
    title: "Giấc Mơ Đôi Ta",
    content: "Nếu có một ngày hoàn hảo cùng nhau, đó sẽ là gì?",
    options: [
      {
        label: "🌅 Picnic trên đồi cỏ, ngắm hoàng hôn and sex~",
        meaning:
          "🌹 Lá bài Mặt Trời Lặn — Sự tự do và hoang dại. Tình yêu hòa mình vào thiên nhiên, không giới hạn.",
      },
      {
        label: "🎬 Nằm nhà xem phim, ôm em ăn vặt cả ngày,...and chill",
        meaning:
          "🔮 Lá bài Tổ Ấm — Hạnh phúc là sự bình yên giản dị. Chỉ cần có nhau, đâu cũng là thiên đường.",
      },
      {
        label: "✈️ Được thịt anh tới sáng",
        meaning:
          "🍷 Lá bài La Bàn — Cùng nhau chinh phục những chân trời mới. Tình yêu là một cuộc hành trình không hồi kết.",
      },
      {
        label: "💆‍♀️ Anh sẽ hầu hạ cả ngày cho em massage, đấm lưng,...",
        meaning:
          "✨ Lá bài Ngọn Nến — Sự phục vụ là ngôn ngữ của sự tận tụy. Em là nữ hoàng trong thế giới của anh.",
      },
    ],
  },
  {
    id: 14,
    type: "quiz",
    title: "Lời Hứa",
    content: "Lời hứa nào em muốn anh giữ suốt đời?",
    options: [
      {
        label: "🛡️ Luôn trung thực, kể cả khi sự thật đau",
        meaning:
          "🌹 Lá bài Tấm Khiên — Sự thật là nền tảng. Dù đau, sự chân thành sẽ luôn bảo vệ tình yêu.",
      },
      {
        label: "🔥 Không bao giờ ngừng cố gắng vì em",
        meaning:
          "🔮 Lá bài Ngọn Lửa — Tình yêu cần được nuôi dưỡng mỗi ngày. Anh hứa sẽ không bao giờ lơ là.",
      },
      {
        label: "👸 Luôn đặt em lên hàng đầu",
        meaning:
          "🍷 Lá bài Vương Miện — Em xứng đáng được yêu thương hoàn toàn. Anh sẽ luôn ưu tiên em.",
      },
      {
        label: "👫 Chỉ là bạn dù như nào không muốn có bước típp",
        meaning:
          "✨ Lá bài Đồng Hành — Tình bạn là gốc rễ của tình yêu bền vững. Anh sẽ mãi là tri kỷ của em.",
      },
    ],
  },
  {
    id: 15,
    type: "quiz",
    title: "Điều Không Nói",
    content: "Có điều gì em muốn nói với anh nhưng chưa bao giờ nói?",
    options: [
      {
        label: "🦁 Em muốn lúc call s** anh gia trưởng hơn",
        meaning:
          "🌹 Lá bài Trái Tim — Sự chiếm hữu đầy đam mê. Em muốn được dẫn dắt và thuộc về anh hoàn toàn.",
      },
      {
        label: "🛡️ Đôi khi em cần anh mạnh mẽ hơn",
        meaning:
          "🔮 Lá bài Hiệp Sĩ — Em cần một bờ vai vững chãi để dựa vào. Hãy là người hùng bảo vệ em.",
      },
      {
        label: "🌊 Em yêu anh nhiều hơn anh nghĩ",
        meaning:
          "🍷 Lá bài Biển Sâu — Tình yêu thầm lặng nhưng sâu thẳm. Những gì em thể hiện chỉ là một phần nhỏ.",
      },
      {
        label: "🛠️ Em nghĩ anh còn nhiều thiếu xót cần cố gắng hơn",
        meaning:
          "✨ Lá bài Chiếc Neo — Sự thẳng thắn để cùng nhau tốt hơn. Tình yêu bền vững cần sự xây dựng từ hai phía.",
      },
    ],
  },
  {
    id: 16,
    type: "quiz",
    title: "Happy Ending",
    content: "Em có đồng ý cùng anh đi đến tận cùng thế giới không?",
    isSpecial: true,
    options: [
      {
        label: "Em đồng ý! Đi cùng anh đến tận cùng thế giới 💖",
        meaning:
          "🌹 Lá bài The World — Thế giới của anh chính là em. Cảm ơn em đã đến bên đời anh.",
        isCorrect: true,
      },
      {
        label: "Em muốn theo mìn lên giường  🧩",
        meaning:
          "🔮 Lá bài The Lovers — Hai tâm hồn hòa làm một. Chúng ta sinh ra là để dành cho nhau.",
        isCorrect: true,
      },
      {
        label: "Chắc chắn rồi! Đồ đáng ghét của em 🥰",
        meaning:
          "🍷 Lá bài Strength — Tình yêu của chúng ta sẽ vượt qua mọi thử thách. Anh yêu em!",
        isCorrect: true,
      },
      {
        label: "Yes, I do! Nguyện bên anh trăm năm không đổi 💍",
        meaning:
          "✨ Lá bài The Sun — Tương lai rạng ngời đang chờ đón chúng ta. Hạnh phúc viên mãn.",
        isCorrect: true,
      },
    ],
  },

  // ==================================================
  // 10 CHALLENGE CARDS (SPLIT: 5 GENTLE + 5 SPICY)
  // ==================================================

  // === NHÓM 1: DỊU DÀNG & NGỌT NGÀO (ID 17-21) ===
  {
    id: 17,
    type: "challenge",
    title: "🔥 Thử Thách: Cái Nhìn",
    content: "Nhìn vào mắt nhau không chớp qua màn hình!",
    options: [
      {
        label: "Dịu Dàng",
        content:
          "Nhìn vào mắt nhau 30 giây qua camera không được cười. Người cười trước phải làm aegyo (động tác dễ thương).",
      },
      {
        label: "Thú Vị",
        content:
          "Nhìn sâu vào camera 1 phút. Trong lúc đó, nói ra 3 điều em yêu nhất ở anh.",
      },
      {
        label: "Nóng Bỏng",
        content:
          "Ghé sát camera, nhìn vào mắt nhau và tưởng tượng đang ở cạnh nhau. Không được phá lên cười.",
      },
    ],
  },
  {
    id: 18,
    type: "challenge",
    title: "🔥 Thử Thách: Giọng Nói Mê Hoặc",
    content: 'Dùng giọng nói của bạn để "chạm" vào đối phương qua màn hình.',
    options: [
      {
        label: "Dịu Dàng",
        content:
          'Thì thầm "Em yêu anh/Anh yêu em" sát micro với 3 sắc thái khác nhau (ngọt ngào, quyến rũ, nghiêm túc).',
      },
      {
        label: "Thú Vị",
        content:
          "Kể lại một giấc mơ ướt át hoặc lãng mạn mà bạn từng có về đối phương bằng giọng kể chuyện đêm khuya.",
      },
      {
        label: "Nóng Bỏng",
        content:
          'Tạo ra những âm thanh "nhạy cảm" (tiếng thở, tiếng rên nhẹ) để trêu chọc đối phương trong 1 phút.',
      },
    ],
  },
  {
    id: 19,
    type: "challenge",
    title: "🔥 Thử Thách: Ca Sĩ Bất Đắc Dĩ",
    content: "Hát hoặc ngân nga một giai điệu tặng người ấy.",
    options: [
      {
        label: "Dịu Dàng",
        content:
          "Hát một đoạn điệp khúc bài hát tình yêu mà cả hai cùng thích.",
      },
      { label: "Thú Vị", content: "Vừa hát vừa phát ra tiếng nhạy cảm." },
      {
        label: "Nóng Bỏng",
        content: 'Hát hoặc đọc rap một bài có lời lẽ "hư hỏng" hoặc quyến rũ.',
      },
    ],
  },
  {
    id: 20,
    type: "challenge",
    title: "🔥 Thử Thách: Khen Ngợi",
    content: "Mưa lời khen dành cho đối phương.",
    options: [
      {
        label: "Dịu Dàng",
        content: "Khen 3 điểm trên khuôn mặt mà bạn thích nhất.",
      },
      {
        label: "Thú Vị",
        content: 'Khen 3 tính cách của đối phương khiến bạn "đổ đứ đừ".',
      },
      {
        label: "Nóng Bỏng",
        content: "Mô tả cơ thể đối phương bằng 3 từ gợi cảm nhất.",
      },
    ],
  },
  {
    id: 21,
    type: "challenge",
    title: "🔥 Thử Thách: Sự Thật",
    content: "Trả lời thành thật một câu hỏi khó!",
    options: [
      {
        label: "Dịu Dàng",
        content: "Lần đầu tiên gặp nhau, ấn tượng của bạn là gì?",
      },
      {
        label: "Thú Vị",
        content: 'Điều gì ở đối phương khiến bạn "phát điên" (theo nghĩa tốt)?',
      },
      {
        label: "Nóng Bỏng",
        content:
          "Bạn đã bao giờ tự sướng khi nghĩ về đối phương chưa? Kể chi tiết (nếu dám).",
      },
    ],
  },

  // === NHÓM 2: NÓNG BỎNG & HƯ HỎNG (SECRET) (ID 22-26) ===
  {
    id: 22,
    type: "challenge",
    title: "🔥 Thử Thách: Show & Tell",
    content: "Dùng camera để trêu chọc và quyến rũ đối phương.",
    options: [
      {
        label: "Dịu Dàng",
        content:
          "Zoom camera vào đôi mắt, đôi môi hoặc bàn tay của bạn. Nhìn sâu vào camera.",
      },
      {
        label: "Thú Vị",
        content:
          "Khoe một điểm trên cơ thể mà bạn tự tin nhất (xương quai xanh, eo...) và tạo dáng trước camera.",
      },
      {
        label: "Nóng Bỏng",
        content:
          'Hé lộ một chút "da thịt" hoặc mặc một món đồ gợi cảm để đối phương ngắm trong 10 giây (nếu tiện).',
      },
    ],
  },
  {
    id: 23,
    type: "challenge",
    title: "🔥 Thử Thách: Điều Khiển Từ Xa",
    content: "Bạn là con rối, đối phương là người điều khiển qua màn hình.",
    options: [
      {
        label: "Dịu Dàng",
        content: "Đối phương yêu cầu bạn làm 3 biểu cảm khuôn mặt cute nhất.",
      },
      {
        label: "Thú Vị",
        content:
          "Đối phương ra lệnh cho bạn hôn lên màn hình hoặc gửi nụ hôn gió theo 3 kiểu khác nhau.",
      },
      {
        label: "Nóng Bỏng",
        content:
          "Master & Servant: Trong 2 phút, bạn phải làm theo mọi mệnh lệnh (tạo dáng, âm thanh) của đối phương.",
      },
    ],
  },
  {
    id: 24,
    type: "challenge",
    title: "🔥 Thử Thách: Diễn Xuất Hư Hỏng",
    content: "Đóng vai và quyến rũ đối phương.",
    options: [
      {
        label: "Dịu Dàng",
        content: "Giả vờ là người lạ mới quen và đang tán tỉnh đối phương.",
      },
      {
        label: "Thú Vị",
        content: 'Giả làm "bad boy" hoặc "bad girl" trêu chọc đối phương.',
      },
      {
        label: "Nóng Bỏng",
        content:
          "Diễn lại một cảnh trong phim lãng mạn/nóng bỏng mà bạn thích (chỉ lời thoại và biểu cảm).",
      },
    ],
  },
  {
    id: 25,
    type: "challenge",
    title: "🔥 Thử Thách: Cận Cảnh",
    content: "Sử dụng camera để tạo sự thân mật.",
    options: [
      {
        label: "Dịu Dàng",
        content: "Dí sát mặt vào camera và hôn lên màn hình 5 cái.",
      },
      {
        label: "Thú Vị",
        content:
          "Quay camera xuống ngực hoặc đùi (vẫn mặc đồ) và nói giọng quyến rũ.",
      },
      {
        label: "Nóng Bỏng",
        content: "Liếm môi thật chậm trước camera trong 10 giây.",
      },
    ],
  },
  {
    id: 26,
    type: "challenge",
    title: "🔥 Thử Thách: Lời Thề Hư Hỏng",
    content: "Một lời hứa táo bạo cho lần gặp tới.",
    options: [
      {
        label: "Dịu Dàng",
        content: "Hứa sẽ ôm đối phương thật chặt trong 5 phút không buông.",
      },
      {
        label: "Thú Vị",
        content: "Hứa sẽ mặc bộ đồ mà đối phương thích nhất.",
      },
      {
        label: "Nóng Bỏng",
        content:
          "Thì thầm vào tai đối phương (qua mic) điều hư hỏng nhất bạn sẽ làm cho họ khi gặp nhau.",
      },
    ],
  },
];
