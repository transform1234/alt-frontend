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

      <iframe src="https://h5p.org/h5p/embed/1372413" width="1019" height="270" frameborder="0" allowfullscreen="allowfullscreen" allow="geolocation *; microphone *; camera *; midi *; encrypted-media *" title="Match the Organisms: The objective of the game is to collect the most pairs. Select card and remember which cards are where and then try selecting its pair..."></iframe>
      <script src="https://h5p.org/sites/all/modules/h5p/library/js/h5p-resizer.js" charset="UTF-8"></script>

  );
}