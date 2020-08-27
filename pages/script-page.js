import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {Button, Card, Layout, Page, ResourceList, Stack} from '@shopify/polaris';

const CREATE_SCRIPT_TAG =gql`
   mutation scriptTagCreate($input: ScriptTagInput!){
       scriptTagCreate(input: $input){
           scriptTag{
               id
           }
           userErrors{
               field
               message
           }
       }
   }
`;

const QUERY_SCRIPTTAGS = gql`
 query{
     scriptTags(first: 40){
         edges{
             node{
                 id
                 src
                 displayScope
             }
         }
     }
 }
`;

const DELETE_SCRIPTTAG = gql`
   mutation scriptTagDelete($id: ID!){
       scriptTagDelete(id: $id){
           deletedScriptTagId
           userErrors{
               field
               message
           }
       }
   }
`;

function ScriptPage(){

   const [createScripts] = useMutation(CREATE_SCRIPT_TAG);
   const [deleteScripts] = useMutation(DELETE_SCRIPTTAG);
    const {loading, error, data} =useQuery(QUERY_SCRIPTTAGS);
    if (loading) return <div>loading..</div>;
    if (error) return <div>{error.message}</div>;
    console.log("this is script data",data)
    return(
       
          <Page>
              <Layout>
                  <Layout.Section>
                      <Card title="These are the scxript tags" sectioned>
                          <p>
                              create or delete script tag
                          </p>
                      </Card>
                  </Layout.Section>
                  <Layout.Section secondary>
                      <Card title="Delete tag" sectioned>
                          <Button 
                          primary
                          size="slim"
                          type="submit" onClick={() =>{
                              createScripts({
                                  variables:{
                                      input:{
                                          src: 'https://2661b61c5d48.ngrok.io/test-script.js',
                                          displayScope: "ALL"
                                      }
                                  },
                                  
                                      refetchQueries: [{query: QUERY_SCRIPTTAGS }] 
                                  
                              })
                          }}
                          >
                              Create script tag
                          </Button>
                      </Card>
                  </Layout.Section>
                  <Layout.Section>
                      <Card>
                          <ResourceList
                            showHeader
                            resourceName={{ singular: 'Script', plural: 'Scripts'}}
                            items={data.scriptTags.edges}
                            renderItem={item => {
                                return(
                                    <ResourceList.Item id={item.id}>
                                        <Stack>
                                            <Stack.Item>
                                               <p>{item.node.id}</p>
                                            </Stack.Item>
                                            <Stack.Item>
                                                <Button type="submit" onClick={() => {
                                                    deleteScripts({
                                                        variables:{
                                                            id: item.node.id
                                                        },
                                                        refetchQueries: [{query: QUERY_SCRIPTTAGS}]
                                                    })
                                                }}>
                                                    Delete Script Tag
                                                </Button>
                                            </Stack.Item>
                                        </Stack>
                                    </ResourceList.Item>
                                )
                            }}
                          />
                      </Card>
                  </Layout.Section>
              </Layout>
          </Page>
        )
}

export default ScriptPage;