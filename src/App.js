import './App.css';
import { 
  Grid,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  ListItem,
  ListItemText,
  Typography,
  Avatar,
  ListItemSecondaryAction,
  List,
  ListItemAvatar,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { 
  getProducts,
} from './api/Products';
import { 
  getSnippets,
  addSnippet,
} from './api/Snippets';
import { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ToolTippedTableCell = ({title, children, ...props}) => {
  return (
    <TableCell {...props}>
      <Tooltip title={title} >
        <div>
          {children}
        </div>
      </Tooltip>
    </TableCell>
  )
}

function App() {

  const [products, setProducts] = useState([]);
  const [snippets, setSnippets] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetchProducts();
    fetchSnippets();
  }, [])

  async function fetchProducts() {
    const response = await getProducts();
    if (response.status >= 200 && response.status < 300) {
      console.log(response);
      setProducts(response.data)
    }
  }

  async function submitSnippet() {
    
  }

  async function fetchSnippets() {
    const response = await getSnippets();
    if (response.status >= 200 && response.status < 300) {
      console.log('snippets', response);
      setSnippets(response.data)
    }

  }

  return (
    <div className="App">
      <Grid container justify="center">
        <Grid item xs={12}>
          <h1>Products</h1>
        </Grid>
        <Grid item xs={8}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Image</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((row) => (
                  <TableRow key={row.id}>
                      <ToolTippedTableCell align="left" title={row.description}>
                        <img height="100" width="100"
                        src={`https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-xr-white-select-201809?wid=441&hei=529&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1551226036668`} />
                      </ToolTippedTableCell>
                      <ToolTippedTableCell align="right" title={row.description}>{row.name}</ToolTippedTableCell>
                      <ToolTippedTableCell align="right" title={row.description}>{row.price}</ToolTippedTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} style={{marginTop: '2em'}}>
          <h1>Snippets</h1>
        </Grid>
        <Grid item container xs={12} justify="center">
          <Button variant="contained" color="primary">
            Add snippet
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6" className={classes.title}>
            Avatar with text and icon
          </Typography>
          <div>
            <List>
              {snippets.map((item) => (
                <ListItem key={item.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={item.text}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
