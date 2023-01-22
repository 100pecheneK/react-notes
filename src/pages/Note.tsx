import {Button, Col, Row, Stack} from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import {Link, useNavigate} from 'react-router-dom'
import NoteTagsStack from '../components/NoteTagsStack'
import {useNote} from './NoteLayout'

type NoteProps = {
	onDelete: (id: string) => void
}
export default function Note({onDelete}: NoteProps) {
	const note = useNote()
	const navigate = useNavigate()

	return (
		<>
			<Row className="alignt-items-center mb-4">
				<Col>
					<h1>{note.title}</h1>
					<NoteTagsStack tags={note.tags} />
				</Col>
				<Col xs="auto">
					<Stack gap={2} direction="horizontal">
						<Link to={`/${note.id}/edit`}>
							<Button variant="primary">Edit</Button>
						</Link>
						<Button
							onClick={() => {
								onDelete(note.id)
								navigate('/')
							}}
							variant="outline-danger"
						>
							Delete
						</Button>
						<Link to="/">
							<Button variant="outline-secondary">Back</Button>
						</Link>
					</Stack>
				</Col>
			</Row>
			<ReactMarkdown>{note.markdown}</ReactMarkdown>
		</>
	)
}
