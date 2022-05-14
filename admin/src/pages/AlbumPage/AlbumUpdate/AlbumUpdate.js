import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button, Container, Grid, TextField, Typography, Paper, Input, Box, AlertTitle, FormLabel, CircularProgress } from '@mui/material';
import { makeStyles } from "@material-ui/styles";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { fetchAsyncAlbumById, AsyncUpdateAlbum, getAlbum, fetchAsyncAlbums } from "../../../Redux/Slice/AlbumSlice";
import React, { useState, useEffect } from 'react';
import { unwrapResult } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import DatePicker from "react-date-picker";
import Select from "react-select";
import { fetchAsyncGenres, getListGenres } from "../../../Redux/Slice/GenreSlice";
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { fetchAsyncSingers, getListSingers } from "../../../Redux/Slice/SingerSlice";
import { fetchAsyncMusicians, getListMusicians } from "../../../Redux/Slice/MusicianSlice";
import * as moment from 'moment'
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
	const singers = useSelector(getListSingers);
	const musicians = useSelector(getListMusicians);

	const album = useSelector(getAlbum);
	const { albumId } = useParams();
	const [loading, setLoading] = useState(true);
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
			reactions: 0,
			debuted_date: new Date(),
			genre: '',
			musician: [],
			singer: []
		}
	)
	useEffect(() => {
		const action = async () => {
			// setLoading(true);
			await dispatch(fetchAsyncGenres());
			await dispatch(fetchAsyncSingers());
			await dispatch(fetchAsyncMusicians());

		}
		action();
		// setLoading(false);
	}, [])
	const GenresOptions = genres && genres.map((genre) => {
		return (
			{ label: genre.name, value: genre._id }
		)
	})
	const SingersOptions = singers && singers.map((singer) => {
		return (
			{ label: singer.name, value: singer._id }
		)
	})
	const MusiciansOptions = musicians && musicians.map((musician) => {
		return (
			{ label: musician.name, value: musician._id }
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
				debuted_date: new Date(moment(album.debuted_date).format('YYYY/MMM/DD')),
				genre: album.genre,
				rating: album.rating ? album.rating : "",
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
	const handleChangeSelectGenre = (value) => {
		const newdata = { ...info };
		const array = value.split(",");
		newdata['genre'] = array;
		setInfo(newdata);

	}
	const handleChangeSelectSinger = (value) => {
		const newdata = { ...info };
		const array = value.split(",");
		newdata['singer'] = array;
		setInfo(newdata);

	}
	const handleChangeSelectMusician = (value) => {
		const newdata = { ...info };
		const array = value.split(",");
		newdata['musician'] = array;
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
		info.rating && formdata.append('rating', info.rating);
		Array.from(genre).map((value) => {
			formdata.append('genre', value);
		})
		Array.from(info.musician).map((value) => {
			formdata.append('musician', value);
		})
		Array.from(info.singer).map((value) => {
			formdata.append('singer', value);
		})
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
	console.log(info)
	return (
		<Container maxWidth='xl' component={Paper} sx={{ height: '100%', pt: 2 }}>
			{
				loading ?
				<Box sx={{ display: 'flex' }}>
                  <CircularProgress />
               </Box>
				:
					<>
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
													Genres *:
												</FormLabel>
												<MultiSelect
													required
													placeholder='select genre'
													name='genre'
													onChange={handleChangeSelectGenre}
													options={GenresOptions}

												/>
											</div>
											<div className={classes.marginInput}>
												<FormLabel sx={{ fontWeight: 500, color: 'black' }}>
													Musician *:
												</FormLabel>
												<MultiSelect
													required
													placeholder='select musician'
													name='musician'
													onChange={handleChangeSelectMusician}
													options={MusiciansOptions}

												/>
											</div>
											<div className={classes.marginInput}>
												<FormLabel sx={{ fontWeight: 500, color: 'black' }}>
													Singer *:
												</FormLabel>
												<MultiSelect
													required
													placeholder='select singer'
													name='singer'
													onChange={handleChangeSelectSinger}
													options={SingersOptions}

												/>
											</div>
										
												<Button type='submit' variant='contained' sx={{ my: 0.5 }}>
													Create
												</Button>
											
											

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
					</>
			}


		</Container>
	);
};

export default AlbumUpdate;