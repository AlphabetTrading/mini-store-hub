import { UpdateProductData, UpdateProductVars, UPDATE_PRODUCT } from '@/graphql/products/mutations';
import { PRODUCT } from '@/graphql/products/queries';
import { useMutation } from '@apollo/client';
import { ExpandMore } from '@mui/icons-material';
import { TableRow, TableCell, IconButton, Button, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react'
import CustomChip from '../custom-chip';
import { PriceHistory } from '../../../types/product';

type Props = {
    priceHistory:PriceHistory;
    activePriceId:string;
    productId:string;
}

const PriceHistoryListRow = ({activePriceId,priceHistory,productId}: Props) => {
    const [
      setActivePrice,
      {
        data: updateData,
        loading: updateLoading,
        error: updateError,
      },
    ] = useMutation<
      UpdateProductData,
      UpdateProductVars
    >(UPDATE_PRODUCT);

    const handleSetActivePrice = async (
      id: string
    ) => {
      await setActivePrice({
        variables: {
          updateProductId: productId,
          data: {
            activePriceId: id,
          },
        },
        refetchQueries: [PRODUCT],
      });
    };

    return (
      <TableRow>
        <TableCell>
          {/* <IconButton
            onClick={() =>
              handlePriceToggle(history.id)
            }
          >
            {selectedPrice ? (
              <ExpandMore />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton> */}
        </TableCell>
        <TableCell>
          {dayjs(priceHistory.createdAt).format(
            "DD/MM/YYYY"
          )}
        </TableCell>
        <TableCell>
          {priceHistory.purchasedPrice}
        </TableCell>
        <TableCell>{priceHistory.price}</TableCell>
        <TableCell>
          {priceHistory.id ===
          activePriceId ? (
            <CustomChip
              label="Active"
              status="info"
            />
          ) : (
            <Button
              disabled={updateLoading}
              onClick={() =>
                handleSetActivePrice(priceHistory.id)
              }
            >
              {updateLoading && (
                <CircularProgress
                  size={16}
                  sx={{
                    mr: 1,
                    color: "neutral.500",
                  }}
                />
              )}
              Set as active
            </Button>
          )}
        </TableCell>
      </TableRow>
    );
  }


export default PriceHistoryListRow