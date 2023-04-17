import { IconByName, Layout } from "@shiksha/common-lib";
import { Link,useNavigate } from "react-router-dom";
import { Box, Stack, VStack, HStack, Avatar, Image } from "native-base";

export default function FunActivity() {
  const navigate = useNavigate();
  return (
    <Layout
    _appBar={{
      isShowNotificationButton: false,
     
      LeftIcon: (
        <HStack>
          <IconByName name="ArrowLeftLineIcon"  onPress={() => navigate("/")}/>

        </HStack>
      ),
    }}
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            route: "/",
          },
          {
            title: "CLASSES",
            icon: "TeamLineIcon",
            route: "/classes",
          },
          {
            title: "SCHOOL",
            icon: "GovernmentLineIcon",
            route: "/",
          },
          {
            title: "MATERIALS",
            icon: "BookOpenLineIcon",
            route: "/",
          },
          {
            title: "CAREER",
            icon: "UserLineIcon",
            route: "/",
          },
        ],
      }}
    >
      {/* <h1>Sample Module</h1> */}
      <iframe src="https://h5p.org/node/1372413" height={'470px'}/>
    </Layout>
  );
}
