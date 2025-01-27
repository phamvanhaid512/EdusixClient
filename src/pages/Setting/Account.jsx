import { useRef, useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Camera from "../../components/commom/icons/Camera";
import classNames from "classnames";
import { useUser } from '../../utils/UserAPI'; 
import { apiServer, serverEndpoint } from "../../utils/http";
import ToastMessage from "../../utils/alert";
import { useNotificationProvider } from '../../utils/NotificationApi';
export default function Account() {
  const inputFileRef = useRef(null);
  const imageRef = useRef(null);
  const location = useLocation();
  const { user, isLoading, error, handleLogout } = useUser();

  const { unreadCount } = useNotificationProvider();

  // Ensure user data is available before accessing properties
  const userDetails = user?.userDetails || {};
  
  const [menuItems, setMenuItems] = useState([
    {
      name: "Thông tin của tôi",
      href: "/account/profile",
      current: true,
    },
    { name: `Thông báo của tôi (${unreadCount})`, href: "/account/notification", current: false },
    { name: "Khóa học đã đăng kí ", href: "/account/course", current: false },
    { name: "Khóa học đã mua ", href: "/account/purchasecourse", current: false },
    { name: "Chứng chỉ của tôi", href: "/account/certification", current: false },
    { name: "Blog", href: "/account/blog", current: false },
    {
      name: "Lịch sử mua hàng",
      href: "/account/purchase-history",
      current: false,
    },
  ]);

  useEffect(() => {
    // Update the menu item with the correct unreadCount when it changes
    setMenuItems(prevMenuItems => {
      const updatedMenuItems = [...prevMenuItems];
      const notificationMenuItem = updatedMenuItems.find(item => item.href === "/account/notification");

      if (notificationMenuItem) {
        notificationMenuItem.name = `Thông báo của tôi (${unreadCount})`;
      }

      return updatedMenuItems;
    });
  }, [unreadCount]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);

      try {
        // Assuming you have the `apiServer` configured globally
        const response = await apiServer.patch(`/user/update/${userDetails.user_id}`, formData);

        if (response.status === 200) {
          ToastMessage('Cập nhật ảnh đại diện thành công').success();
          // Optionally, you can also update the local user data
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        
  
        } else {
          ToastMessage('Đã xảy ra lỗi khi cập nhật ảnh đại diện').warn();
        }
      } catch (error) {
        console.error('Error updating user image:', error);
        ToastMessage('Đã xảy ra lỗi khi cập nhật ảnh đại diện').warn();
      }
    }
  };

  const selectedMenuItem = menuItems.find(
    (item) => item.href === location.pathname
  );
  const avatarUrl = userDetails && userDetails.avatar
  ? userDetails.avatar.startsWith("https")
    ? userDetails.avatar
    : `${serverEndpoint}user/avatar/${userDetails.avatar}`
  : "https://cdn.lazi.vn/storage/uploads/users/avatar/1586848529_anh-dai-dien-avatar-dep-facebook.jpg";






  
  return (
    <>
     <div className="grid grid-cols-1 md:w-[100%] md:flex gap-6 px-4 md:px-20 my-10">
  <div className="md:w-[30%] md:col-span-3 col-span-12 bg-[#f8f8f8] pt-[28px] pb-6 h-fit rounded-xl">
    <div className="flex flex-col items-center">
            <label htmlFor="fileInput" className="relative">
              <img
                ref={imageRef}
                className="w-[60px] h-[60px] rounded-full cursor-pointer object-cover"
                src={ avatarUrl }
                alt=""
                onClick={() => inputFileRef}
              />
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                ref={inputFileRef}
                className="absolute bottom-0 right-0 opacity-0"
                onChange={handleImageChange}
              />
              <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full cursor-pointer">
                <Camera width={14} height={14}></Camera>
              </div>
            </label>
            <p className="text-[16px] font-medium">{userDetails.fullname}</p>
            <div className="h-[1px] w-full bg-[#e8e8e8] my-6"></div>
            <div className="w-full text-[#333333]">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.href === location.pathname
                      ? "bg-[#ffeee8] border-l-4 border-[#FF6636]"
                      : "border-l-4 border-[#f8f8f8] hover:bg-[#ffeee8] hover:border-l-4 hover.border-[#FF6636] focus:bg-[#ffeee8]",
                    "w-full flex px-6 py-3 text-sm font-medium leading-6"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 md:w-[70%] mt-4 md:mt-0 md:ml-4">
    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center mb-4">
      {selectedMenuItem && (
        <p className="px-3 py-2 border-l-4 border-[#ff6636] text-[16px] text-[#ff6636] font-medium leading-6">
          {selectedMenuItem.name}
        </p>
      )}
    </div>
    <Outlet />
  </div>
</div>
      </div>
    </>
  );
}
