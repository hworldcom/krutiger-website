# Brand Asset Register

## Status definitions

- **Approved working asset:** may be used during website development.
- **Candidate source:** may be reviewed, but individual assets require approval before use.
- **Pending:** required information or a higher-quality source is missing.

## Assets

| Asset                                | Status                 | Source                                                                                                               | Local file                        | Technical details                                                                                                | Rights and approval notes                                                                                                                                             |
| ------------------------------------ | ---------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Official circular badge              | Approved working asset | [Current KRUTIGER website asset](https://static.wixstatic.com/media/2ca83e_7d793715a1684d9aac1717e9733d1af1~mv2.png) | `public/brand/krutiger-badge.png` | PNG, RGB, 1000×1000, no transparency, SHA-256 `6bf02acc9a8e0f2170ddeb8c1d14a44f22bd040e4f1de5e9a3510ca949ee0d39` | Identified by the project owner as the actual logo. Copyright ownership and the existence of source/vector files still need to be recorded.                           |
| Instagram photography collection     | Candidate source       | [Official KRUTIGER Instagram account](https://www.instagram.com/krutiger.muay_thai_in_berlin/)                       | Not imported                      | Public previews are compressed and unsuitable as production masters.                                             | The account is approved as a candidate source. Each photograph still requires its original file, photographer/rightsholder confirmation, and depicted-person consent. |
| Sak Yant-inspired background artwork | Pending                | Visible on the current KRUTIGER splash page                                                                          | Not imported                      | Source file and meaning have not been verified.                                                                  | Do not extract or reproduce until provenance and approved usage are confirmed.                                                                                        |
| Vector or transparent logo           | Pending                | To be supplied                                                                                                       | Not available                     | Preferred formats: SVG, AI, EPS, PDF, or transparent PNG                                                         | Required for flexible placement on light backgrounds and high-density print/social use.                                                                               |
| Small-size mark or wordmark          | Pending                | To be supplied or separately approved                                                                                | Not available                     | Must remain recognizable at 16–64 pixels                                                                         | Do not derive one from the badge without explicit approval.                                                                                                           |

## Asset handling

- Never overwrite the approved master file with an optimized derivative.
- Generate responsive web derivatives during the build or image pipeline.
- Use lowercase, descriptive filenames without dates unless the date is meaningful.
- Record the source, rights holder, consent, and approval state before placing a new asset in production content.
