import {useMemo, useState} from 'react'
import {Button, Col, Form, Row, Stack} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import ReactSelect from 'react-select'
import {EditTagsModal} from '../components/EditTagsModal'
import {NoteCardProps, NoteCard} from '../components/NoteCard'
import {Tag} from '../types/Note'

type NoteListProps = {
	availableTags: Tag[]
	notes: NoteCardProps[]
	onDeleteTag: (id: string) => void
	onUpdateTag: (id: string, label: string) => void
}

export default function NoteList({
	availableTags,
	notes,
	onDeleteTag,
	onUpdateTag,
}: NoteListProps) {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([])
	const [title, setTitle] = useState('')
	const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)
	const filteredNotes = useMemo(
		() => filterNotes(notes, selectedTags, title),
		[title, selectedTags, notes],
	)
	return (
		<>
			<Row className="align-items-center mb-4">
				<Col>
					<h1>Notes</h1>
				</Col>
				<Col xs="auto">
					<Stack gap={2} direction="horizontal">
						<Link to="/new">
							<Button variant="primary">Create</Button>
						</Link>
						<Button
							onClick={() => setEditTagsModalIsOpen(true)}
							variant="outline-secondary"
						>
							Edit Tags
						</Button>
					</Stack>
				</Col>
			</Row>
			<Form>
				<Row className="mb-4">
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<ReactSelect
								value={selectedTags.map((tag) => ({
									label: tag.label,
									value: tag.id,
								}))}
								options={availableTags.map((tag) => ({
									label: tag.label,
									value: tag.id,
								}))}
								onChange={(tags) =>
									setSelectedTags(
										tags.map((tag) => ({label: tag.label, id: tag.value})),
									)
								}
								isMulti
							/>
						</Form.Group>
					</Col>
				</Row>
			</Form>
			<Row xs={1} sm={2} lg={3} xl={4} className="g-3">
				{filteredNotes.map((note) => (
					<Col key={note.id}>
						<NoteCard id={note.id} title={note.title} tags={note.tags} />
					</Col>
				))}
			</Row>
			<EditTagsModal
				onUpdateTag={onUpdateTag}
				onDeleteTag={onDeleteTag}
				availableTags={availableTags}
				handleClose={() => setEditTagsModalIsOpen(false)}
				show={editTagsModalIsOpen}
			/>
		</>
	)
}

function filterNotes(
	notes: NoteCardProps[],
	selectedTags: Tag[],
	title: string,
) {
	return notes.filter(
		(note) =>
			(title === '' ||
				note.title.toLowerCase().includes(title.toLocaleLowerCase())) &&
			(selectedTags.length === 0 ||
				selectedTags.every((tag) =>
					note.tags.some((noteTag) => noteTag.id === tag.id),
				)),
	)
}