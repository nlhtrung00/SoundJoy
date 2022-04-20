import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button, Container, Grid, TextField, Typography, Paper, Input, Box, AlertTitle } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { fetchAsyncGenreById, refreshGenre, AsyncUpdateGenre, getGenre, fetchAsyncGenres } from "../../../Redux/Slice/GenreSlice";
import React, { useState, useEffect, createRef } from 'react';
import { unwrapResult } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
const GenreUpdate = () => {
	const genre = useSelector(getGenre);
	const { genreId } = useParams();
	const [edited, setEdited] = useState(false);
	const [error, setError] = useState('');
	const [createResult, setResult] = useState(false);
	const [openToast, setOpen] = useState(false);
	const [previewImg, setPreviewImg] = useState();
	const dispatch = useDispatch();
	const history = useHistory();

	const [imagefile, setImageFile] = useState();
	const [info, setInfo] = useState((
		{
			name: 'loading',
			image: 'loading'
		}
	))
	console.log(info);
	// fetch genre by id when render UI
	useEffect(() => {
		dispatch(fetchAsyncGenreById(genreId));

	}, [genreId])
	useEffect(() => {
		if (genre) {
			setInfo({
				name: genre.name,
				image: genre.image
			})
		}
	}, [genre])
	// fetch list again after change info
	useEffect(() => {
		dispatch(fetchAsyncGenres());
	}, [createResult])

	const handleInput = (e) => {
		setEdited(true);
		const newdata = { ...info };
		newdata[e.target.id] = e.target.value;
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
		let id = genreId;
		let name = info.name;
		let image = imagefile ? imagefile : info.image;
		const formdata = new FormData();
		formdata.append('name', name);
		formdata.append('image', image);
		try {
			let action = await dispatch(AsyncUpdateGenre({ formdata, id }))
			let result = unwrapResult(action);
			setResult(true);
			setOpen(true);
		} catch (error) {
			setError(error.message);
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
				Update information of Genre
			</Typography>
			{genre && Object.keys(genre).length === 0 ? <div>Loading...</div>
				:
				<>
					<Grid container justifyContent="center" sx={{ p: 2 }}
					// alignItems="center"
					>
						<Grid item md={3} align='center'>
							<Avatar src={previewImg ? previewImg : info.image} alt='avtar of genre' sx={{ width: 150, height: 150, my: 0.5, mx: "auto" }} />
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
									label='Name of genre'
									type='text'
									value={info.name || " "}
									fullWidth
									sx={{ my: 0.5 }}
									onChange={handleInput}
									required
								/>
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
									You created successfully.Let's check !

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

export default GenreUpdate;