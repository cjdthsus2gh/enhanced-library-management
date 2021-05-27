import { Flex, Heading, Stack } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useAsync } from "react-async";
import { getIssueList } from "../lib/api";
import IssueItem, { IssueItemProps } from "./IssueItem";
import Layout from "./Layout";

type CheckIssuePageProps = {
  userId: string;
};

const CheckIssuePage = ({ userId }: CheckIssuePageProps) => {
  const { data, error, isLoading } = useAsync<any>({
    promiseFn: getIssueList,
    userId,
  });

  return (
    <Layout>
      <>
        <Flex width="100%" direction="column" alignItems="center">
          <Heading as="h1" size="4xl">
            Check Issue Info Page
          </Heading>
          <Tabs
            isFitted
            variant="enclosed"
            width="80%"
            marginTop="50px"
            marginBottom="50px"
          >
            <TabList>
              <Tab>Paper Book</Tab>
              <Tab>E-Book</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack width="100%" alignItems="center">
                  {isLoading ? (
                    <Flex>Loading...</Flex>
                  ) : error ? (
                    <Flex>Error on loading</Flex>
                  ) : (
                    <>
                      {data
                        ?.filter((item: any) => item.bookType === "paper")
                        .map((item: any, index: number) => (
                          <IssueItem
                            key={index}
                            title={item.title}
                            author={item.author}
                            imgLink="1"
                            bookType={item.bookType}
                            issueStart={item.startDate}
                            issueEnd={item.dueDate}
                            calculatedFine={item.calculatedFine}
                            eBookReadable={item.overdueState}
                          />
                        ))}
                    </>
                  )}
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack width="100%" alignItems="center">
                  {isLoading ? (
                    <Flex>Loading...</Flex>
                  ) : error ? (
                    <Flex>Error on loading</Flex>
                  ) : (
                    <>
                      {data
                        ?.filter((item: any) => item.bookType === "e-book")
                        .map((item: any) => (
                          <IssueItem
                            key={item.id}
                            title={item.title}
                            author={item.author}
                            imgLink="1"
                            bookType={item.bookType}
                            issueStart={item.issueStart}
                            issueEnd={item.issueEnd}
                            calculatedFine={item.calculatedFine}
                            eBookReadable={item.eBookReadable}
                          />
                        ))}
                    </>
                  )}
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </>
    </Layout>
  );
};

export default CheckIssuePage;
