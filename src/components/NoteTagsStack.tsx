import {Stack, Badge} from 'react-bootstrap'
import {Tag} from '../types/Note'

type NoteTagsStackProps = {
	tags: Tag[]
}
export default function NoteTagsStack({tags}: NoteTagsStackProps) {
	if (tags.length < 0) return null

	return (
		<>
			<Stack gap={1} direction="horizontal" className="flex-wrap">
				{tags.map((tag) => (
					<Badge className="text-truncate" key={tag.id}>
						{tag.label}
					</Badge>
				))}
			</Stack>
		</>
	)
}
