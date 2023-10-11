/* eslint-disable prettier/prettier */
import { icons, images } from '../constants'

export const categoryData = [
    {
        id: 1,
        name: "Cơm",
        icon: { uri: icons.rice_bowl },
    },
    {
        id: 2,
        name: "Mì - Phở",
        icon: { uri: icons.noodle },
    },
    {
        id: 3,
        name: "Lẩu",
        icon: { uri: icons.hotpot },
    },
    {
        id: 4,
        name: "Đồ Nhậu",
        icon: { uri: icons.nhau },
    },
    {
        id: 5,
        name: "Lề Đường",
        icon: { uri: icons.pizza },

    },
    {
        id: 6,
        name: "Đặc Sản",
        icon: { uri: icons.special },
    },
    {
        id: 7,
        name: "Fastfood",
        icon: { uri: icons.european },
    },
    {
        id: 8,
        name: "Tráng Miệng",
        icon: { uri: icons.donut },
    },
    {
        id: 9,
        name: "Thức Uống",
        icon: { uri: icons.drink },
    },
]

export const RecommendTag = [
    {
        id: 1,
        name: "Thời tiết",
        icon: { uri: icons.sun },

    },
    {
        id: 2,
        name: "Độ Tuổi",
        icon: { uri: icons.age },
    },
    {
        id: 3,
        name: "Phổ biến",
        icon: { uri: icons.stars },
    },
    {
        id: 4,
        name: "Gần bạn",
        icon: icons.area
    }
]




// price rating
export const affordable = 1
export const fairPrice = 2
export const expensive = 3

export const restaurantData = [
    {
        id: 1,
        name: "Nhà hàng Góc Huế",
        rating: 4.8,
        categories: [2, 6],
        priceRating: affordable,
        photo: { uri: images.goc_Hue },
        address: "45 KỲ ĐỒNG,P.9, QUẬN 3, Thành phố Hồ Chí Minh",
        duration: "30 - 45 phút",
        isSelected: false,
        location: [
            10.781825758334673, 106.6808474929608
        ],
        menu: [
            {
                menuId: 1,
                name: "Bún Bò Đặc Biệt",
                photo: { uri: images.bun_bo },
                description: "Bún bò Huế được mệnh danh là 1 trong 50 món ăn ngon nhất thế giới. Để có được một tô bún bò chuẩn vị đặc sản Huế.",
                calories: 900,
                price: 50.000
            },
            {
                menuId: 2,
                name: "Bún Mắm Nêm",
                photo: { uri: images.bun_mam_nem },
                description: "Bún mắm nêm là món ăn đặc sản của người dân miền Trung, cụ thể là ở Huế và Đà Nẵng.",
                calories: 250,
                price: 50.000
            },
            {
                menuId: 3,
                name: "Bánh Ướt Tôm Tươi",
                photo: { uri: images.banh_uot },
                description: "Bánh ướt hay bánh cuốn, bánh mướt là một món ăn quen thuộc thường được người Việt dùng vào bữa sáng.",
                calories: 500,
                price: 40.000
            }
        ]
    },

    {
        id: 2,
        name: "GoGi House",
        rating: 4.8,
        categories: [3, 9],
        priceRating: affordable,
        photo: { uri: images.gogi },
        address: "216 Võ Văn Ngân, Quận Thủ Đức, TP. HCM",
        duration: "30 - 45 phút",
        isSelected: false,
        location: [
            10.852077406680637, 106.76512227194853
        ],
        menu: [
            {
                menuId: 1,
                name: "Lẩu Cay Hải Sản",
                photo: { uri: images.lau_cay_hai_san },
                description: "Lẩu hải sản ngon bởi nó có thể tận dụng được độ ngọt từ hải sản để làm nên nước lẩu kết hợp với các loại rau, nấm đặc trưng.",
                calories: 1000,
                price: 319.000
            },
            {
                menuId: 2,
                name: "Lẩu quân đội",
                photo: { uri: images.lau_quan_doi_1_2 },
                description: "Budae jjigae, hay lẩu quân đội, là một trong những món ăn được yêu thích nhất ở Hàn Quốc.",
                calories: 2000,
                price: 329.000
            },
            {
                menuId: 3,
                name: "Cơm trộn bát đá hàn quốc",
                photo: {
                    uri: images.com_tron_bat_da_han_quoc
                },
                description: "Cơm bát đá nóng (hay còn gọi là Cơm trộn Hàn Quốc) là một trong những món ăn được rất nhiều người yêu thích.",
                calories: 900,
                price: 99.000
            },
            {
                menuId: 4,
                name: "Rượu Mơ Haruka Crystal (200ml)",
                photo: { uri: images.ruou_mo_haruka_crystal },
                description: "Rượu mơ nhật Haruka là sản phẩm mởi được ra mắt của công ty rượu Vodka Cá Sấu dành cho thị trường Việt Nam.",
                calories: 50,
                price: 129.000
            },
            {
                menuId: 5,
                name: "Táo Xanh Cocktail",
                photo: { uri: images.tao_xanh_cocktail },
                description: "Hương vị thanh mát của Soda táo xanh sẽ tạo nên cảm giác mát lạnh khi thưởng thức. Đây chắc chắn là món thức uổng giải nhiệt hiệu quả trong mùa hè.",
                calories: 49,
                price: 149.000
            },
        ]
    },

    {
        id: 3,
        name: "Lẩu dê Đồng Hương 2",
        rating: 4.0,
        categories: [3, 2],
        priceRating: affordable,
        photo: { uri: images.lau_de_dong_huong },
        address: "Số 113 Hoàng Diệu 2, Quận Thủ Đức, TP. HCM",
        duration: "10 - 15 phút",
        isSelected: false,
        location: [
            10.856787554744363, 106.76603112537543
        ],
        menu: [
            {
                menuId: 1,
                name: "Lẩu Dê",
                photo: { uri: images.lau_de },
                description: "Lẩu dê là một trong nhiều món ăn quen thuộc với người dân hằng ngày hay thậm chí là những ngày lễ",
                calories: 1500,
                price: 200.000
            },
            {
                menuId: 2,
                name: "Vú Dê Nướng",
                photo: { uri: images.vu_de_nuong },
                description: "Vú dê là một trong số các món ăn khoái khẩu của rất nhiều người, đặc biệt khi được nướng lên thơm phức thì khó ai mà cưỡng lại được.",
                calories: 1100,
                price: 75.000
            },
            {
                menuId: 3,
                name: "Bao Tử Xào Khế",
                photo: { uri: images.bao_tu_xao_khe },
                description: "Dạ dày (bao tử heo) khi được chế biến thành các món ăn sẽ rất thơm ngon, hấp dẫn, dậy mùi thơm đặc trưng.",
                calories: 800,
                price: 50.000
            },
            {
                menuId: 4,
                name: "Tôm Sốt Bơ Tỏi",
                photo: { uri: images.tom_xot_bo_toi },
                description: "Tôm là một loại hải sản được rất nhiều người yêu thích, hàm lượng canxi dồi dào.",
                calories: 900,
                price: 100.000
            }
        ]
    },
    {
        id: 4,
        name: "Quán Cơm Tấm Hoàng Diệu 2",
        rating: 4.8,
        categories: [1],
        priceRating: affordable,
        photo: { uri: images.com_tam_hoang_dieu },
        address: "201 Đ. Hoàng Diệu 2, Phường Linh Trung, Thủ Đức, Thành phố Hồ Chí Minh",
        duration: "30 - 45 min",
        isSelected: false,
        location: [
            10.862642296504768, 106.76780945084933
        ],
        menu: [
            {
                menuId: 1,
                name: "Cơm Tấm",
                photo: { uri: images.com_tam },
                description: "Cơm tấm Sài Gòn từ lâu là một món ăn rất đỗi bình dân và quen thuộc.",
                calories: 2500,
                price: 30.000
            },
            {
                menuId: 2,
                name: "Cơm Đùi Gà",
                photo: { uri: images.com_dui_ga },
                description: "Cơm gà chiên nước mắm là món ăn rất ngon đậm đà từ sốt mắm, tỏi, ớt, kết hợp thịt gà chiên bên ngoài giòn, bên trong ẩm, nóng mềm thơm ngons.",
                calories: 3000,
                price: 40.000
            },
            {
                menuId: 3,
                name: "Cơm Bò Lúc Lắc ",
                photo: { uri: images.com_bo },
                description: "Cơm bò lúc lắc là một trong những biến tấu của món cơm trắng quen thuộc.",
                calories: 1500,
                price: 45.000
            }
        ]
    },

    {
        id: 5,
        name: "Nhà Hàng HS Giang Ghẹ",
        rating: 4.8,
        categories: [4, 5, 9],
        priceRating: affordable,
        photo: { uri: images.giang_ghe },
        address: "40 Đặng Văn Bi, Bình Thọ, Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
        duration: "30 - 45 min",
        isSelected: false,
        location: [
            10.842879933931306, 106.76448647180196
        ],
        menu: [
            {
                menuId: 1,
                name: "Cua Gạch Cà Mau",
                photo: { uri: images.cua_gach },
                description: "Size: 0.4 -  0.7kg/con",
                calories: 2500,
                price: 730.000
            },
            {
                menuId: 2,
                name: "Cá Hồi Na Uy",
                photo: { uri: images.ca_hoi },
                description: "Cá Hồi được nhập trực tiếp từ Na Uy.",
                calories: 500,
                price: 147.000
            },

            {
                menuId: 3,
                name: "Mì Xào Hải Sản",
                photo: { uri: images.mi_xao },
                description: "Mì xào hải sản là món ăn quen thuộc và thường xuất hiện trong các bữa ăn hoặc trên bàn tiệc.",
                calories: 1000,
                price: 70.000
            },
            {
                menuId: 4,
                name: "Các Loại Bia, Rượu",
                photo: { uri: images.bia },
                description: "Bia, Rượu hiện có trên thị trường.",
                calories: 1000,
                price: 300.000
            }
        ]
    },
    {
        id: 6,
        name: "Osaka Ramen",
        rating: 4.8,
        categories: [2, 6, 9],
        priceRating: affordable,
        photo: { uri: images.osaka },
        address: "133 Nguyễn Đức Cảnh, phường Tân Phong, quận 7",
        duration: "30 - 45 min",
        isSelected: false,
        location: [
            10.724297679899795, 106.70891008121713
        ],
        menu: [
            {
                menuId: 1,
                name: "Ramen",
                photo: { uri: images.ramen },
                description: "Ramen (ラーメン) là một món mì của Nhật Bản.",
                calories: 2500,
                price: 130.000
            },
            {
                menuId: 2,
                name: "Cá Hồi Nướng",
                photo: { uri: images.ca_hoi_nuong },
                description: "Cá hồi nướng là một cách chế biến cá hồi vừa ngon vừa đơn giản.",
                calories: 500,
                price: 147.000
            },

            {
                menuId: 3,
                name: "Cá Thu Nướng",
                photo: { uri: images.ca_thu },
                description: "Cá thu là một loài cá sống ở nước mặn vì thế thành phần dinh dưỡng có bên trong thịt cá rất tốt cho cơ thể.",
                calories: 1000,
                price: 70.000
            },
            {
                menuId: 4,
                name: "Rượu Sake",
                photo: { uri: images.sake },
                description: "Bia, Rượu hiện có trên thị trường.",
                calories: 1000,
                price: 300.000
            }
        ]
    },
    {
        id: 7,
        name: "Út Cá Mau",
        rating: 4.8,
        categories: [3, 6],
        priceRating: affordable,
        photo: { uri: images.osaka },
        address: "133 Nguyễn Đức Cảnh, phường Tân Phong, quận 7",
        duration: "30 - 45 min",
        isSelected: false,
        location: [
            10.842879933931306, 106.76448647180196
        ],
        menu: [
            {
                menuId: 1,
                name: "Ramen",
                photo: { uri: images.ramen },
                description: "Ramen (ラーメン) là một món mì của Nhật Bản.",
                calories: 2500,
                price: 130.000
            },
            {
                menuId: 2,
                name: "Cá Hồi Nướng",
                photo: { uri: images.ca_hoi_nuong },
                description: "Cá hồi nướng là một cách chế biến cá hồi vừa ngon vừa đơn giản.",
                calories: 500,
                price: 147.000
            },

            {
                menuId: 3,
                name: "Cá Thu Nướng",
                photo: { uri: images.ca_thu },
                description: "Cá thu là một loài cá sống ở nước mặn vì thế thành phần dinh dưỡng có bên trong thịt cá rất tốt cho cơ thể.",
                calories: 1000,
                price: 70.000
            },
            {
                menuId: 4,
                name: "Rượu Sake",
                photo: { uri: images.sake },
                description: "Bia, Rượu hiện có trên thị trường.",
                calories: 1000,
                price: 300.000
            }
        ]
    },
    {
        id: 8,
        name: "Quán cháo lòng bà Út",
        rating: 4.0,
        categories: [4, 5],
        priceRating: affordable,
        photo: { uri: images.chaolongbaut },
        address: "193 Cô Giang, Phường Cô Giang, Quận 1, Thành phố Hồ Chí Minh",
        duration: "30 - 45 min",
        isSelected: false,
        location: [
            10.761645455097868, 106.6931081542774
        ],
        menu: [
            {
                menuId: 1,
                name: "Cháo Lòng",
                photo: { uri: images.chaolong },
                description: "Lòng heo được mầm sạch sẽ, và đảm bảo vệ sinh.",
                calories: 1500,
                price: 30.000
            },
            {
                menuId: 2,
                name: "Má Heo Nướng",
                photo: { uri: images.maheo },
                description: "Má heo được tẩm muối ớt, sẽ rất ngon khi ăn cùng các gia vị đi kém.",
                calories: 1000,
                price: 120.000
            },

            {
                menuId: 3,
                name: "Huyết Chưng",
                photo: { uri: images.huyetchung },
                description: "Huyết chưng thường được ăn chung với bánh mì và các loại rau thơm đính kèm.",
                calories: 1000,
                price: 60.000
            },
            {
                menuId: 4,
                name: "Các loại nước giải khát.",
                photo: { uri: images.nuocngot },
                description: "Coca, Sá Xị, 7UP......",
                calories: 1000,
                price: 300.000
            }
        ]
    },

    {
        id: 9,
        name: "Quán bánh mì Hòa Mã",
        rating: 4.0,
        categories: [5, 7],
        priceRating: affordable,
        photo: { uri: images.banhmihoama },
        address: "53 Đ. Cao Thắng, Phường 3, Quận 3",
        duration: "30 - 45 min",
        isSelected: false,
        location: [
            10.774399243174036, 106.68145119172489
        ],
        menu: [
            {
                menuId: 1,
                name: "Bánh Mì Chảo",
                photo: { uri: images.banhmichao },
                description: "Bánh mì chảo là một ăn quen thuộc vào mỗi buổi sáng của người dân SG.",
                calories: 1500,
                price: 30.000
            },
            {
                menuId: 2,
                name: "Bánh Mì Ốp la",
                photo: { uri: images.banhmiopla },
                description: "Món bánh mì đơn giản nhưng giàu năng lượng và không kém phần thơm ngon.",
                calories: 1000,
                price: 15.000
            },

            {
                menuId: 3,
                name: "Bánh Mì Thập Cẩm",
                photo: { uri: images.banhmithapcam },
                description: "Một phần bánh mì thập cẩm với rất nhiều toping ở trong.",
                calories: 1000,
                price: 30.000
            },

        ]
    },
    {
        id: 10,
        name: "Quán bánh mì Hòa Mã",
        rating: 4.5,
        categories: [4, 6, 9],
        priceRating: affordable,
        photo: { uri: images.dimsumtienphat },
        address: "18 Ký Hoà, Phường 11, Quận 5, Thành phố Hồ Chí Minh",
        duration: "30 - 45 min",
        isSelected: false,
        location: [
            10.758185833452208, 106.66160659028434
        ],
        menu: [
            {
                menuId: 1,
                name: "Bánh Cuộn Tôm",
                photo: { uri: images.banhcuontom },
                description: "Bánh cuốn kiểu người Hoa, giá ko rẻ nhưng lúc nào cũng đông.",
                calories: 1500,
                price: 30.000
            },
            {
                menuId: 2,
                name: "Há Cảo Tôm",
                photo: { uri: images.hacao },
                description: " Há cảo là phiên âm của thuật ngữ Trung Quốc 蝦 餃, có nghĩa là bánh bao nhân tôm.",
                calories: 1000,
                price: 40.000
            },

            {
                menuId: 3,
                name: "Sủi Cảo",
                photo: { uri: images.suicao },
                description: "Sủi cảo là một món ăn quen thuộc của Trung Quốc và cũng đã phổ biến từ lâu ở Việt Nam với nhiều kiểu biến tấu.",
                calories: 1000,
                price: 50.000
            },

        ]
    },

    {

        id: 11,
        name: "Lẩu Chay Thiện Duyên ",
        rating: 4.4,
        categories: [1, 2],
        priceRating: affordable,
        photo: { uri: images.LauChay },
        isSelected: false,
        duration: "35 - 40 min",
        location: [
            10.871365793414048, 106.79790483359295
        ],

        menu: [
            {
                menuId: 1,
                name: "Lẩu chay 1 người",
                photo: {
                    uri: images.LauChauxn
                },
                description: "Lẩu chay 1 người",
                calories: 100,
                price: 35
            },
            {
                menuId: 2,
                name: "Lẩu chạy 2 người",
                photo: {
                    uri: images.LauChauxn
                },
                description: "Lẩu chay 2 người",
                calories: 100,
                price: 90
            },
            {
                menuId: 3,
                name: "Lẩu chay 3 người",
                photo: {
                    uri: images.LauChauxn
                },
                description: "Lẩu chay 3 người",
                calories: 300,
                price: 150
            }

        ]

    },

    {

        id: 12,
        name: "Bún đậu phúc kỳ 3 ",
        rating: 3.4,
        categories: [1, 2],
        priceRating: affordable,
        isSelected: false,
        photo: { uri: images.BunDau },
        duration: "35 - 40 min",
        location: [
            10.872271911532884, 106.7986799555692
        ],

        menu: [
            {
                menuId: 1,
                name: "Bún đậu mắm tôm",
                photo: { uri: images.BunDauMamTom },
                description: "Bún đậu mắm tôm",
                calories: 100,
                price: 35
            },
            {
                menuId: 2,
                name: "Bún chả",
                photo: { uri: images.BunCha },
                description: "Bún chả Hà Nội",
                calories: 100,
                price: 30
            },
            {
                menuId: 3,
                name: "Bún thịt nướng",
                photo: { uri: images.BunThitNuong },
                description: "Bún thịt nướng",
                calories: 300,
                price: 30
            }
        ]

    },
    {

        id: 13,
        name: "CƠM CHAY THIÊN NHIÊN - Làng Đại Học",
        rating: 4.8,
        categories: [1, 2],
        priceRating: affordable,
        photo: { uri: images.ComChay },
        isSelected: false,
        duration: "35 - 40 min",
        location: [
            10.87267755822793, 106.79951415902461
        ],

        menu: [
            {
                menuId: 1,
                name: "Cơm thập cẩm",
                photo: { uri: images.ComChayThapCam },
                description: "Cơm thập cẩm",
                calories: 100,
                price: 15
            },
            {
                menuId: 2,
                name: "Cơm dương châu",
                photo: { uri: images.ComDuongChau },
                description: "Cơm dương châu",
                calories: 100,
                price: 15
            },
            {
                menuId: 3,
                name: "Bún bò Huế",
                photo: { uri: images.BunBoChay },
                description: "Bún bò Huế",
                calories: 300,
                price: 15
            }
        ]

    },
    {

        id: 14,
        name: "Tàu hủ đường Thể Dục Thể Thao",
        rating: 4.9,
        categories: [5, 6],
        priceRating: affordable,
        photo: { uri: images.TauHu },
        isSelected: false,
        duration: "35 - 40 min",
        location: [
            10.872652403041405, 106.79758787392154
        ],

        menu: [
            {
                menuId: 1,
                name: "Tàu hủ đường",
                photo: { uri: images.TauHuDuong },
                description: "Tàu hủ đường",
                calories: 100,
                price: 15
            },
            {
                menuId: 2,
                name: "Tàu hủ trân châu",
                photo: { uri: images.TauHuTranChau },
                description: "Tàu hủ trân châu",
                calories: 100,
                price: 15
            },
        ]

    },

    {

        id: 15,
        name: "Phở Lý Quốc Sư Hà Nội| PHỞ NGON LÀNG ĐẠI HỌC| PHỞ NGON THỦ ĐỨC",
        rating: 4.8,
        categories: [1, 2],
        priceRating: affordable,
        photo: { uri: images.Pho },
        isSelected: false,
        duration: "35 - 40 min",
        location: [
            10.87307648646291, 106.8001064681853
        ],

        menu: [
            {
                menuId: 1,
                name: "Phở gà",
                photo: { uri: images.PhoGa },
                description: "Phở gà",
                calories: 100,
                price: 30
            },
            {
                menuId: 2,
                name: "Phở bò",
                photo: { uri: images.PhoBo },
                description: "Phở bò",
                calories: 100,
                price: 30
            },
            {
                menuId: 3,
                name: "Phở thập cẩm",
                photo: { uri: images.PhoThapCam },
                description: "Phở thập cẩm",
                calories: 100,
                price: 40
            },
        ]

    },

    {

        id: 16,
        name: "HẰNG THIỆN VEGAN",
        rating: 4.7,
        categories: [3],
        priceRating: affordable,
        photo: { uri: images.LauChayVegan },
        isSelected: false,
        duration: "35 - 40 min",
        location: [
            10.877625706884025, 106.80462624717026
        ],

        menu: [
            {
                menuId: 1,
                name: "Gỏi ngũ sắc",
                photo: { uri: images.GoiNguSac },
                description: "Gỏi ngũ sắc",
                calories: 100,
                price: 30
            },
            {
                menuId: 2,
                name: "Chả giò thập cẩm",
                photo: { uri: images.ChaGioThapCam },
                description: "Chả giò thập cẩm",
                calories: 100,
                price: 30
            },
            {
                menuId: 3,
                name: "Chả giò trái cây",
                photo: { uri: images.ChaGioTraiCay },
                description: "Chả giò trái cây",
                calories: 100,
                price: 40
            },
        ]

    },

    {

        id: 17,
        name: "Bánh tráng, trứng nướng",
        rating: 4.7,
        categories: [6, 7],
        priceRating: affordable,
        photo: { uri: images.BanhTrangNuong },
        duration: "35 - 40 min",
        isSelected: false,
        location: [
            10.876783722619491, 106.80339595686634
        ],

        menu: [
            {
                menuId: 1,
                name: "Bánh tráng nướng",
                photo: { uri: images.BanhTrang },
                description: "Bánh tráng nướng",
                calories: 100,
                price: 12
            },
            {
                menuId: 2,
                name: "Trứng nướng",
                photo: { uri: images.TrungNuong },
                description: "Trứng nướng",
                calories: 100,
                price: 12
            },

        ]

    },

    {

        id: 18,
        name: "Trà sữa Tea Lux",
        rating: 2.8,
        categories: [9],
        priceRating: affordable,
        photo: { uri: images.TeaLux },
        duration: "35 - 40 min",
        isSelected: false,
        location: [
            10.874017984810111, 106.80156132590388
        ],

        menu: [
            {
                menuId: 1,
                name: "Cà phê đá",
                photo: { uri: images.CafeDa },
                description: "Cà phê đen đá",
                calories: 100,
                price: 12
            },
            {
                menuId: 2,
                name: "Cà phê sữa",
                photo: { uri: images.CafeSua },
                description: "Cà phê sữa",
                calories: 100,
                price: 18
            },

        ]

    },

    {

        id: 19,
        name: "P.E.Y Fresh And Delicious",
        rating: 2.8,
        categories: [9],
        priceRating: affordable,
        photo: { uri: images.PEY },
        duration: "35 - 40 min",
        isSelected: false,
        location: [
            10.87353200251911, 106.79798325907313
        ],

        menu: [
            {
                menuId: 1,
                name: "Cà phê đá",
                photo: { uri: images.CafeDa },
                description: "Cà phê đen đá",
                calories: 100,
                price: 12
            },
            {
                menuId: 2,
                name: "Cà phê sữa",
                photo: { uri: images.CafeSua },
                description: "Cà phê sữa",
                calories: 100,
                price: 18
            },

        ]

    },
    {
        id: 20,
        name: "BƠ Trà sữa - Bánh su",
        rating: 2.8,
        categories: [8, 9],
        priceRating: affordable,
        photo: { uri: images.BanhSu },
        duration: "35 - 40 min",
        isSelected: false,
        location: [
            10.867831858381962, 106.79823002230795
        ],

        menu: [
            {
                menuId: 1,
                name: "Bánh su kem",
                photo: { uri: images.BanhSuKem },
                description: "Bánh su kem",
                calories: 100,
                price: 12
            },
            {
                menuId: 2,
                name: "Bánh pudding trứng",
                photo: { uri: images.PuddingTrung },
                description: "Bánh pudding trứng",
                calories: 100,
                price: 18
            },
            {
                menuId: 3,
                name: "Bánh mì hoa cúc",
                photo: { uri: images.BanhMiHoaCuc },
                description: "Bánh mì hoa cúc",
                calories: 100,
                price: 18
            },

        ]

    },
]

export const mapselect = [
    {
        id: 1,
        name: "Nhà hàng",
        icon: icons.cutlery,
    },
    {
        id: 2,
        name: "Cây xăng",
        icon: icons.cayxang,
    },
    {
        id: 3,
        name: "ATM",
        icon: icons.atm,
    },
    {
        id: 4,
        icon: images.vietmap,
    },
]


export default {
    mapselect,
    restaurantData,
    categoryData
};
