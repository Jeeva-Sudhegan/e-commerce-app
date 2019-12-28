import React from "react";
import MenuItem from "@components/menu-item/menu-item.component";
import "./directory.styles.scss";
import { selectDirectorySections }  from "@redux/directory/directory.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

const Directory = ({ sections }) => (
            <div className="directory-menu">
                {
                    sections.map(({id, ...restOfSection}) => (
                      <MenuItem key={id} {...restOfSection} />
                    ))
                }
            </div>
        )

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);