import React from 'react'
import NextLink from 'next/link'
import { Box, Typography, Chip, SvgIcon } from '@mui/material';
import {Notification} from '../../../types/notification';
type Props = {
    href: string;
    notification:Notification;

}

const NotificationItem = ({href,notification}: Props) => {
  return (
    <Box
    sx={{
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: 'divider',
      display: 'flex',
      p: 2,
      ...(notification.isRead && {
        position: 'relative',
        '&:before': {
          backgroundColor: 'primary.main',
          content: '" "',
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: 4
        },
        '& $name, & $subject': {
          fontWeight: 600
        }
      }),
      // ...(selected && {
      //   backgroundColor: 'primary.lightest'
      // }),
      // ...(!selected && {
      //   '&:hover': {
      //     backgroundColor: 'action.hover'
      //   }
      // })
    }}
    // {...other}
    
    >
    <Box
    component={NextLink}
    href={href}
    sx={{
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      flexGrow: 1,
      flexWrap: {
        xs: 'wrap',
        md: 'nowrap'
      },
      minWidth: 1,
      textDecoration: 'none'
    }}
  >
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex'
      }}
    >
      
      {/* <Typography
        color="text.primary"
        sx={{
          width: 120,
          ml: 2,
          ...(notification.isRead && {
            fontWeight: 600
          })
        }}
        noWrap
        variant="body2"
      >
        {.from.name}
      </Typography> */}
    </Box>
    <Box
      sx={{
        flexGrow: 1,
        ml: {
          xs: 0,
          md: 2
        },
        my: {
          xs: 2,
          md: 0
        },
        overflow: 'hidden',
        width: {
          xs: '100%',
          md: 'auto'
        }
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          maxWidth: 800,
          width: '100%'
        }}
      >
        <Typography
          color="text.primary"
          sx={{
            fontWeight: 600,
            minWidth: 100,
            maxWidth: 400,
            mr: 1
          }}
          noWrap
          variant="body2"
        >
          {notification.title}
        </Typography>
        <Typography
          color="text.secondary"
          noWrap
          variant="body2"
        >
          —
          {notification.body}
        </Typography>
      </Box>
      
    </Box>
    <Typography
      color="text.secondary"
      variant="caption"
      sx={{
        display: 'block',
        textAlign: {
          xs: 'left',
          md: 'right'
        },
        whiteSpace: 'nowrap',
        width: 100
      }}
    >
      {/* {createdAt} */}
    </Typography>
  </Box>
  </Box>
  )
}

export default NotificationItem