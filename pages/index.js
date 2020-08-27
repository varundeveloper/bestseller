import React, { useState } from 'react';
import {EmptyState, Layout, Page} from "@shopify/polaris";
import { fromAction } from "@shopify/app-bridge/actions/Error";
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import store from 'store-js';
import ProductList from './components/ProductsList';
import axios from 'axios';

function Index(){

    const [modal, setModal] = useState({ open: false })
    const emptyState = !store.get('ids');
    function handleSelection(resources){
        const idsFromResources = resources.selection.map((product) => product.id);
        setModal({ open: false });
        store.set('ids', idsFromResources)
        console.log('this is product ids', store.get('ids'));


         const selectedProducts = resources.selection;
         deleteApiData();
         selectedProducts.map(product => makeApiCall(product));
    }

    function deleteApiData(){
        const url = '/api/products';
        axios.delete(url);
    }
     async function makeApiCall(products){
         const url = '/api/products';
         axios.post(url, products)
         .then(result => console.log(result))
         .catch(error => console.log(error))
     }

    return(
       <Page>
           <TitleBar
            primaryAction={{
                content: 'select new products',
                onAction: () => setModal({ open: true})
            }}
           />
           <ResourcePicker
            resourceType="Product"
            showVariants={false}
            open={ modal.open } 
            onCancel={() => setModal({ open: false })}
            onSelection={(resources) => handleSelection(resources)}

           >

           </ResourcePicker>
           
                { emptyState ?
                 <Layout>
            <EmptyState
               heading="Manage your inventory transfers"
               action={{content: 'Add Products',
               onAction : () => setModal({ open: true})
            }
             }
               secondaryAction={{content: 'Learn more', url: 'https://help.shopify.com'}}
               image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
               
            >
            <p>Track and receive your incoming inventory from suppliers.</p>
            </EmptyState>
            </Layout>
            :
            <ProductList />
            }
            
        </Page>
    )
}

export default Index;