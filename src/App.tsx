import 'bootstrap/dist/css/bootstrap.min.css'
import {Navigate, Route, Routes} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import NewNote from './pages/NewNote'
import {useStorage} from './hooks/useStorage'
import {useMemo} from 'react'
import {v4 as uuidV4} from 'uuid'
import NoteList from './pages/NoteList'
import NoteLayout from './pages/NoteLayout'
import Note from './pages/Note'
import EditNote from './pages/EditNote'
import {RawNote, Tag, NoteData} from './types/Note'

export default function App() {
	const [notes, setNotes] = useStorage<RawNote[]>('NOTES', [])
	const [tags, setTags] = useStorage<Tag[]>('TAGS', [])
	const notesWithTags = useMemo(
		() =>
			notes.map((note) => ({
				...note,
				tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
			})),
		[notes, tags],
	)

	function onCreateNote(data: NoteData) {
		setNotes((prevNotes) => [
			...prevNotes,
			{...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id)},
		])
	}

	function onUpdateNote(id: string, {tags, ...data}: NoteData) {
		setNotes((prevNotes) =>
			prevNotes.map((note) => {
				if (note.id === id) {
					return {...note, ...data, tagIds: tags.map((tag) => tag.id)}
				}
				return note
			}),
		)
	}

	function onDeleteNote(id: string) {
		setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id))
	}
	function addTag(tag: Tag) {
		setTags((prev) => [...prev, tag])
	}
	function updateTag(id: string, label: string) {
		setTags((prevTags) =>
			prevTags.map((tag) => {
				if (tag.id === id) {
					return {...tag, label}
				}
				return tag
			}),
		)
	}
	function deleteTag(id: string) {
		setTags((prevTags) => prevTags.filter((tag) => tag.id !== id))
	}
	return (
		<Container className="my-4">
			<Routes>
				<Route
					path="/"
					element={
						<NoteList
							availableTags={tags}
							notes={notesWithTags}
							onUpdateTag={updateTag}
							onDeleteTag={deleteTag}
						/>
					}
				/>
				<Route
					path="/new"
					element={
						<NewNote
							onSubmit={onCreateNote}
							onAddTag={addTag}
							availableTags={tags}
						/>
					}
				/>
				<Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
					<Route index element={<Note onDelete={onDeleteNote} />} />
					<Route
						path="edit"
						element={
							<EditNote
								onSubmit={onUpdateNote}
								onAddTag={addTag}
								availableTags={tags}
							/>
						}
					/>
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Container>
	)
}
