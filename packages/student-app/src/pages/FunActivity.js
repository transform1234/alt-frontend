import { IconByName, Layout } from "@shiksha/common-lib";
import { Link, useNavigate } from "react-router-dom";
import { Box, Stack, VStack, HStack, Avatar, Image } from "native-base";
import {
  capture,
  Widget,
  NameTag,
  H3,
  H2,
  subjectListRegistryService,
  selfAssesmentService,
  courseRegistryService,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import manifest from "../../src/manifest.json";
import moment from "moment";

export default function FunActivity() {
  const navigate = useNavigate();
  return (
    <Layout
      _appBar={{
        isShowNotificationButton: false,

        LeftIcon: (
          <HStack>
            <IconByName
              name="ArrowLeftLineIcon"
              onPress={() => navigate("/")}
            />
          </HStack>
        ),
      }}
      _footer={{
        menues: [
          {
            title: "Home",
            icon: "Home4LineIcon",
            moduleName: "app",
            selected: ["/"],
            route: "/",
            routeparameters: {},
          },
          {
            title: "Learn",
            icon: "BookLineIcon",
            moduleName: "studentprogram",
            selected: ["/studentprogram"],
            route: "/studentprogram/subjects",
            routeparameters: {},
          },
          {
            title: "Score Card",
            icon: "AwardLineIcon",
            moduleName: "Certificate",
            selected: ["/scorecard"],
            route: "/scorecard",
            routeparameters: {},
          },
          {
            title: "Settings",
            icon: "DashboardLineIcon",
            moduleName: "Settings",
            selected: ["/Settings"],
            route: "/Settings",
            routeparameters: {},
          },
        ],
      }}
    >
      <>
        <iframe
          src="https://h5p.org/h5p/embed/1372413"
          width="1019"
          height="270"
          frameborder="0"
          allowfullscreen="allowfullscreen"
          allow="geolocation *; microphone *; camera *; midi *; encrypted-media *"
          title="Match the Organisms: The objective of the game is to collect the most pairs. Select card and remember which cards are where and then try selecting its pair..."
        ></iframe>
        <script
          src="https://h5p.org/sites/all/modules/h5p/library/js/h5p-resizer.js"
          charset="UTF-8"
        ></script>
        <HStack
          display={"inline"}
          rounded={"2xl"}
          py={6}
          px={4}
          mb={5}
          shadow={3}
        >
          <Box mt={"10px"} mb={"10px"}>
            <Box mt={"10px"} textAlign="center">
              <H3
                mt={"20px"}
                fontSize={"clamp(3rem, 6vw, 6rem)"}
                textAlign={"left"}
              >
                Welcome to a fun memory game! In this game, you will see a set
                of cards, each featuring an organism. Your goal is to flip over
                the cards and remember their positions, and then try to find
                pairs by flipping over other cards. The aim is to match all the
                pairs and win the game.{" "}
              </H3>
              <H2 fontSize={"clamp(3rem, 6vw, 6rem)"} textAlign={"center"}>
                Good luck and have fun!{" "}
              </H2>
            </Box>
          </Box>
        </HStack>
      </>
    </Layout>
  );
}
