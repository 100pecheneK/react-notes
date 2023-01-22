import { Card, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Tag } from "../App"
import styles from './NoteCard.module.css'
import NoteTagsStack from "./NoteTagsStack"

export type NoteCardProps = {
	id: string
	title: string
	tags: Tag[]
}
export function NoteCard({ id, title, tags }: NoteCardProps) {
	return (
		<Card
			as={Link}
			to={`/${id}`}
			className={`h-100 text-reset text-decoration-none ${styles.card}`}
		>
			<Card.Body>
				<Stack
					gap={2}
					className="align-items-center justify-content-center h-100"
				>
					<span className="fs-5">{title}</span>
					<NoteTagsStack tags={tags} />
				</Stack>
			</Card.Body>
		</Card>
	)
}