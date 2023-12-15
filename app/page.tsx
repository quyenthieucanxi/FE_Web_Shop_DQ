
import { signIn } from "next-auth/react";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import TabCategory from "@/components/TabCategrory";
import ListProducts from "@/components/ListProducts";
import Toast from "@/components/Toast";

const Slider = dynamic(() => import("@/components/Slider"), { ssr: false });




export default async function Home() {
  const session = await getServerSession(options)
  if (!!!session?.user )
  {
    signIn();
  }
  return (
    <main >
      <section>
        <div className="mx-auto p-4 bg-white rounded-md max-w-[960px] mt-20">
          < Slider />
        </div>
      </section>
      <section>
        <div className="mx-auto bg-white p-4 mt-4 max-w-[960px] relative" >
          <h2 className="font-bold text-lg">Khám phá danh mục</h2>
          <TabCategory />
        </div>
      </section>
      <section>
        <div className="mx-auto bg-white p-4 mt-4 max-w-[960px]">
          <h2 className="font-bold text-lg">Tin đăng dành cho bạn</h2>
          <ListProducts />
        </div>

      </section>
      <section>
        <div className="mx-auto bg-white p-4 mt-4 max-w-[960px]">
          <h2 className="font-bold text-lg">DQ Shop, Rao Vặt Trực Tuyến Của Người Việt</h2>
          <div className="text-[12px]">

            <p>Chợ Tốt chính thức gia nhập thị trường Việt Nam vào đầu năm 2012, với mục đích tạo ra cho bạn một kênh rao vặt trung gian, kết nối người mua với người bán lại với nhau bằng những giao dịch cực kỳ đơn giản, tiện lợi, nhanh chóng, an toàn, mang đến hiệu quả bất ngờ.</p>

            <p>Đến nay, Chợ Tốt tự hào là Website rao vặt được ưa chuộng hàng đầu Việt Nam. Hàng ngàn món hời từ <a href="">Bất động sản, Nhà cửa</a>, <a href="">Xe cộ</a>, <a href="">Đồ điện tử</a>, Thú cưng, Vật dụng cá nhân... đến <a href="">tìm việc làm</a>, thông tin tuyển dụng, các dịch vụ - du lịch được đăng tin, rao bán trên Chợ Tốt.</p>

            <p>Với Chợ Tốt, bạn có thể dễ dàng mua bán, trao đổi bất cứ một loại mặt hàng nào, dù đó là đồ cũ hay đồ mới với nhiều lĩnh vực:</p>

            <p><strong>Bất động sản:</strong> Cho thuê, Mua bán <a href="">nhà đất</a>, <a href="">căn hộ chung cư</a>, <a href="">văn phòng mặt bằng kinh doanh</a>, phòng trọ đa dạng về diện tích, vị trí</p>

            <p><strong>Phương tiện đi lại:</strong> <a href="">xe ô tô</a>, <a href="">xe máy</a> có độ bền cao, giá cả hợp lý, giấy tờ đầy đủ.</p>

            <p><strong>Đồ dùng cá nhân:</strong> <a href="">quần áo</a>, <a href="">giày dép</a>, <a href="">túi xách</a>, <a href="">đồng hồ</a>... đa phong cách, hợp thời trang.</p>

            <p><strong>Đồ điện tử:</strong> <a href="">điện thoại di động</a>, <a href="">máy tính bảng</a>, <a href="">laptop</a>, <a href="">tivi</a>, <a href="">loa</a>, <a href="">amply</a>...; đồ điện gia dụng: <a href="">máy giặt</a>, <a href="">tủ lạnh</a>, <a href="">máy lạnh điều hòa</a>... với rất nhiều nhãn hiệu, kích thước khác nhau.</p>

            <p>﻿<a href="" target="_blank"><strong>Vật nuôi, thú cưng</strong></a> đa chủng loại: <a href="">gà</a>, <a href="">chó</a>&nbsp;(<a href="">chó phốc sóc</a>, <a href="">chó pug</a>, <a href="">chó poodle</a>...), <a href="">chim</a>, mèo (<a href="">mèo anh lông ngắn</a>, <a href="">mèo munchkin</a>...), cá, hamster giá cực tốt.</p>

            <p><strong>Tuyển dụng, việc làm</strong> với hàng triệu công việc hấp dẫn, phù hợp tại <a href="">Việc Làm Tốt</a> - Kênh tuyển dụng hiệu quả, uy tín được phát triển bởi Chợ Tốt.</p>

            <p>﻿<a href=""><strong>Dịch vụ</strong></a><strong>, <a href="">du lịch</a></strong>: khách sạn, vé máy bay, vé tàu, vé xe, tour du lịch và các voucher du lịch... uy tín, chất lượng.</p>

            <p>﻿<a href="" target="_blank"><strong>Đồ ăn, thực phẩm</strong></a>: các món ăn được chế biến thơm ngon, hấp dẫn, thực phẩm tươi sống, an toàn &amp; giá cả hợp lý.</p>

            <p>Và còn rất nhiều mặt hàng khác nữa đã và đang được rao bán tại Chợ Tốt.</p>

            <p>Mỗi người trong chúng ta đều có những sản phẩm đã qua sử dụng và không cần dùng tới nữa. Vậy còn chần chừ gì nữa mà không để nó trở nên giá trị hơn với người khác. Rất đơn giản, bạn chỉ cần chụp hình lại, mô tả cụ thể về sản phẩm và sử dụng ứng dụng Đăng tin miễn phí của Chợ Tốt là đã có thể đến gần hơn với người cần nó.</p>

            <p>Không những thế, website chotot.com còn cung cấp cho bạn thông tin về giá cả các mặt hàng để bạn có thể tham khảo. Đồng thời, thông qua <a href="https://www.chotot.com/kinh-nghiem/">Blog kinh nghiệm</a>, Chợ Tốt sẽ tư vấn, chia sẻ cho bạn những thông tin bổ ích, bí quyết, mẹo vặt giúp bạn có những giao dịch mua bán an toàn, đảm bảo. Chợ Tốt cũng sẵn sàng hỗ trợ bạn trong mọi trường hợp cần thiết.</p>

            <p>Chúc các bạn có những trải nghiệm mua bán tuyệt vời trên Chợ Tốt.</p>
          </div>
        </div>
      </section>
      <Toast />
    </main>
  )
}
