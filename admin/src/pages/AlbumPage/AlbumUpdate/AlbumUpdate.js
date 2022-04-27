import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button, Container, Grid, TextField, Typography, Paper, Input, Box, AlertTitle, FormLabel } from '@mui/material';
import { makeStyles } from "@material-ui/styles";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { fetchAsyncAlbumById, AsyncUpdateAlbum, getAlbum, fetchAsyncAlbums } from "../../../Redux/Slice/AlbumSlice";
import React, { useState, useEffect } from 'react';
import { unwrapResult } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import DatePicker from "react-date-picker";
import Select from "react-select";
import { getListGenres } from "../../../Redux/Slice/GenreSlice";

const useStyles = makeStyles({
	datetimepicker: {
	   margin: '5px 10px',
 
	},
	marginInput: {
	   margin: '0 0 5px 0'
	}
 })
 
 const customStylesSelect = {
	menu: (provided, state) => ({
	   ...provided,
	   color: state.selectProps.menuColor,
	}),
 
 
	singleValue: (provided, state) => {
	   const opacity = state.isDisabled ? 0.5 : 1;
	   const transition = 'opacity 300ms';
 
	   return { ...provided, opacity, transition };
	}
}

const AlbumUpdate = () => {
	const genres = useSelector(getListGenres);
	const album = useSelector(getAlbum);
	const { albumId } = useParams();
	const [edited, setEdited] = useState(false);
	const [error, setError] = useState(false);
	const [createResult, setResult] = useState(false);
	const [openToast, setOpen] = useState(false);
	const [previewImg, setPreviewImg] = useState();
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();
	const [imagefile, setImageFile] = useState();

	const [info, setInfo] = useState(
		{
			name: '',
			image: '',
			debuted_date: new Date(),
			genre: ''
		}
	)

	const GenresOptions = genres.map((genre) => {
		return (
		   { label: genre.name, value: genre._id }
		)
	})
	// fetch album by id when render UI
	useEffect(() => {
		dispatch(fetchAsyncAlbumById(albumId));

	}, [albumId])
	useEffect(() => {
		if (album) {
			setInfo({
				name: album.name,
				image: album.image,
				reactions: album.reactions,
				debuted_date: album.debuted_date,
				genre: album.genre
			})
		}
	}, [album])
	let GenreDefault = GenresOptions.find((genre) => genre.value === album.genre);
	// fetch list again after change info
	useEffect(() => {
		dispatch(fetchAsyncAlbums());
	}, [createResult])

	const handleInput = (e) => {
		setEdited(true);
		const newdata = { ...info };
		newdata[e.target.id] = e.target.value;
		setInfo(newdata);

	}
	const handleChangeSelectGenre = (data) => {
		const newdata = { ...info };
		newdata['genre'] = data.value;
		setInfo(newdata);
	}
	const handleSelectDate = (value) => {
		const newdata = { ...info };
		newdata['debuted_date'] = value;
		setInfo(newdata);
  
	}
	const handleUpload = (e) => {
		const newImage = e.target.files[0];
		if (newImage) {
			setImageFile(newImage);
			setEdited(true);
		}
	}
	const handleCloseToast = () => {
		setOpen(false);
	}
	const handleUpdate = async (e) => {
		e.preventDefault();
		setError(false);
		let id = albumId;
		let name = info.name;
		let image = imagefile ? imagefile : info.image;
		let reactions = parseInt(info.reactions);
		let debuted_date = info.debuted_date;
		let genre = info.genre;
		const formdata = new FormData();
		formdata.append('name', name);
		formdata.append('image', image);
		formdata.append('reactions', reactions);
		formdata.append('debuted_date', debuted_date);
		formdata.append('genre', genre);
		// console.log(formdata.get('id'), formdata.get('name'), formdata.get('image'), formdata.get('reactions'), formdata.get('debuted_date'), formdata.get('genre'));
		try {
			let action = await dispatch(AsyncUpdateAlbum({ formdata, id }))
			let result = unwrapResult(action);
			setResult(true);
			setOpen(true);
			setError(false);
		} catch (error) {
			// setError(error.message);
			console.log(error.message);
			setError(true);
			setResult(true);
			setOpen(true);
		}



	}
	useEffect(() => {
		if (!imagefile) {
			setPreviewImg(undefined);
			return
		}
		const objectURL = URL.createObjectURL(imagefile);
		setPreviewImg(objectURL);
		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectURL);
	}, [imagefile])

	return (
		<Container component={Paper} elevation={4} sx={{ p: 1 }}>
			<Typography variant='h6'>
				Update information of Album
			</Typography>
			{album && Object.keys(album).length === 0 ? <div>Loading...</div>
				:
				<>
					<Grid container justifyContent="center" sx={{ p: 2 }}
					// alignItems="center"
					>
						<Grid item md={3} align='center'>
							<Avatar src={previewImg ? previewImg : info.image} alt='avtar of album' sx={{ width: 150, height: 150, my: 0.5, mx: "auto" }} />
							<label htmlFor="image">
								<Input accept="image/*" id="image" multiple type="file" sx={{ display: 'none', }} onChange={handleUpload} />
								<Button variant="contained" component="span" size='small' sx={{ bgcolor: '#8a8a8a', '&:hover': { bgcolor: '#5c5c5c' } }}>
									Upload Image
								</Button>


							</label>
						</Grid>
						<Grid item md={9}>
							<form onSubmit={handleUpdate} encType="multipart/form-data">
								<TextField
									id='name'
									label='Name of album'
									type='text'
									value={info.name || " "}
									fullWidth
									sx={{ my: 0.5 }}
									onChange={handleInput}
									required
								/>
								<div >
									<FormLabel sx={{ fontWeight: 500, color: 'black' }}>
										Debuted date:
									</FormLabel>
									<DatePicker
										required
										format="dd/MM/y"
										id='debuted_Date'
										value={info.debuted_date}
										onChange={handleSelectDate}
										className={classes.datetimepicker}
									/>
								</div>

								<div className={classes.marginInput}>
									<FormLabel sx={{ fontWeight: 500, color: 'black' }}>
										Genre:
									</FormLabel>
									<Select required  styles={customStylesSelect} name='genre' options={GenresOptions} onChange={handleChangeSelectGenre} 
										value={GenreDefault}
									/>
								</div>
								{edited &&
									<Button type='submit' variant='contained' sx={{ my: 0.5 }}>
										Create
									</Button>
								}
								{!edited &&
									<Button disabled variant='contained' sx={{ my: 0.5 }}>
										Create
									</Button>
								}


								<Button onClick={history.goBack} variant='contained' sx={{ m: 0.5, bgcolor: '#176384', '&:hover': { bgcolor: '#1a769d' } }}>
									Back
								</Button>
							</form>
						</Grid>
					</Grid>
					{createResult && !error ?
						<Box>
							<Snackbar
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								open={openToast}
								autoHideDuration={3000}
								onClose={handleCloseToast}
							>
								<MuiAlert elevation={6} severity="success" variant="filled" >
									<AlertTitle>Success</AlertTitle>
									You edited successfully.Let's check !

								</MuiAlert>
							</Snackbar>
						</Box> :
						<Box>
							<Snackbar
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								open={openToast}
								autoHideDuration={3000}
								onClose={handleCloseToast}
							>
								<MuiAlert elevation={6} severity="error" variant="filled" >
									<AlertTitle>Error</AlertTitle>
									{error}
								</MuiAlert>
							</Snackbar>
						</Box>}
				</>}

		</Container>
	);
};

export default AlbumUpdate;